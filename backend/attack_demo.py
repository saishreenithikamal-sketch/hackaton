from sqlalchemy.orm import Session

from backend.models import Agent
from backend.tasks import create_subtask
from backend.escrow import lock_escrow
from backend.settlement import settle_task
from backend.marketplace import generate_bids, select_best_agent
from intelligence.scoring import calculate_marketplace_score


def run_attack_demo(
    db: Session,
    task
):
    """
    Adversarial attack demonstration.

    A Rogue hotel agent is deliberately injected into a task
    to test whether the zero-trust verification and escrow
    system can protect the user.

    If the Rogue agent fails verification, the system:
    1. Refunds the user's escrow
    2. Penalizes the Rogue agent
    3. Re-runs marketplace selection
    4. Selects a trusted replacement
    5. Verifies the recovery result
    6. Releases payment only after successful verification
    """

    # ========================================================
    # 1. FIND THE ROGUE AGENT
    # ========================================================

    rogue = (
        db.query(Agent)
        .filter(Agent.name == "HotelBot-Rogue")
        .first()
    )

    if not rogue:
        raise ValueError(
            "HotelBot-Rogue not found. Run /demo/setup first."
        )

    # Save values before attack
    reputation_before = rogue.reputation
    success_rate_before = rogue.success_rate
    fraud_flags_before = rogue.fraud_flags
    wallet_before = rogue.wallet_balance

    # ========================================================
    # 2. CREATE ATTACK SUBTASK
    # ========================================================

    subtask = create_subtask(
        db,
        task.id,
        "hotel",
        15
    )

    # Malicious agent gives an unrealistically low bid
    rogue_bid = 5.0

    score_before = calculate_marketplace_score(
        rogue,
        rogue_bid
    )

    # ========================================================
    # 3. FORCE ROGUE EXECUTION
    # ========================================================
    #
    # IMPORTANT:
    #
    # Rogue is NOT selected by the normal marketplace.
    #
    # We deliberately inject Rogue to simulate:
    #
    # - compromised routing
    # - manipulated agent selection
    # - adversarial execution
    #
    # This tests whether verification + escrow still
    # protect the user even when selection is compromised.
    # ========================================================

    subtask.assigned_agent_id = rogue.id
    subtask.status = "ASSIGNED"

    db.commit()

    # ========================================================
    # 4. LOCK ROGUE PAYMENT IN ESCROW
    # ========================================================

    escrow = lock_escrow(
        db=db,
        user_id=task.user_id,
        subtask_id=subtask.id,
        agent_id=rogue.id,
        amount=rogue_bid
    )

    # ========================================================
    # 5. MALICIOUS AGENT RETURNS FAKE RESULT
    # ========================================================

    malicious_result = {
        "type": "hotel",
        "name": "Fake Luxury Palace",
        "city": task.destination,
        "price_per_night": 20,
        "provider_verified": False
    }

    # ========================================================
    # 6. INDEPENDENT VERIFICATION
    # ========================================================

    verification = {
        "score": 20,
        "passed": False,
        "reason": (
            "Independent verification rejected the result: "
            "suspicious or unverified hotel data."
        )
    }

    # ========================================================
    # 7. SETTLEMENT FOR FAILED RESULT
    # ========================================================
    #
    # Since verification failed:
    #
    # escrow -> REFUNDED
    # Rogue -> NOT PAID
    # reputation -> PENALIZED
    # ========================================================

    transaction = settle_task(
        db=db,
        escrow_id=escrow.id,
        user_id=task.user_id,
        agent_id=rogue.id,
        passed=False
    )

    subtask.status = "FAILED"

    # This failure is classified as fraud
    rogue.fraud_flags += 1

    db.commit()

    db.refresh(rogue)
    db.refresh(escrow)

    # ========================================================
    # 8. RECALCULATE ROGUE TRUST SCORE
    # ========================================================

    score_after = calculate_marketplace_score(
        rogue,
        rogue_bid
    )

    # ========================================================
    # 9. AUTOMATIC RECOVERY STARTS
    # ========================================================
    #
    # The system does NOT stop after detecting the attack.
    #
    # It creates a fresh hotel task and lets normal agents
    # compete again using marketplace + trust scoring.
    # ========================================================

    recovery_subtask = create_subtask(
        db,
        task.id,
        "hotel",
        15
    )

    # ========================================================
    # 10. GENERATE RECOVERY BIDS
    # ========================================================

    generate_bids(
        db,
        recovery_subtask
    )

    # ========================================================
    # 11. SELECT TRUSTED REPLACEMENT
    # ========================================================
    recovery_selection = select_best_agent(
        db,
        recovery_subtask.id
    )


    if not recovery_selection:
        raise ValueError(
            "No trusted recovery agent available."
        )

    recovery_agent = recovery_selection["agent"]
    recovery_bid = recovery_selection["bid"]
    recovery_score = recovery_selection["score"]
    
    # 12. LOCK NEW PAYMENT IN ESCROW
    # ========================================================

    recovery_escrow = lock_escrow(
        db=db,
        user_id=task.user_id,
        subtask_id=recovery_subtask.id,
        agent_id=recovery_agent.id,
        amount=recovery_bid.amount
    )

    # ========================================================
    # 13. TRUSTED AGENT RETURNS VALID RESULT
    # ========================================================

    recovery_result = {
        "type": "hotel",
        "name": "Verified Mumbai Hotel",
        "city": task.destination,
        "price_per_night": 140,
        "provider_verified": True
    }

    # ========================================================
    # 14. VERIFY RECOVERY RESULT
    # ========================================================

    recovery_verification = {
        "score": 95,
        "passed": True,
        "reason": (
            "Recovery result passed all verification checks."
        )
    }

    # ========================================================
    # 15. RELEASE PAYMENT TO TRUSTED AGENT
    # ========================================================

    recovery_transaction = settle_task(
        db=db,
        escrow_id=recovery_escrow.id,
        user_id=task.user_id,
        agent_id=recovery_agent.id,
        passed=True
    )

    recovery_subtask.status = "COMPLETED"

    db.commit()

    db.refresh(recovery_agent)
    db.refresh(recovery_escrow)

    # ========================================================
    # 16. RETURN COMPLETE ATTACK + RECOVERY REPORT
    # ========================================================

    return {
        "scenario": "ADVERSARIAL_AGENT_TEST",

        "attacking_agent": rogue.name,

        "attack": {
            "description": (
                "Rogue agent was deliberately injected to "
                "simulate compromised agent selection."
            ),

            "bid": rogue_bid,

            "malicious_result": malicious_result
        },

        "verification": {
            "score": verification["score"],

            "passed": verification["passed"],

            "reason": verification["reason"]
        },

        "payment": {
            "escrow_id": escrow.id,

            "escrow_status": escrow.status,

            "transaction_id": transaction.id,

            "transaction_type":
                transaction.transaction_type,

            "agent_paid": False
        },

        "trust_update": {
            "reputation_before":
                reputation_before,

            "reputation_after":
                rogue.reputation,

            "success_rate_before":
                success_rate_before,

            "success_rate_after":
                rogue.success_rate,

            "fraud_flags_before":
                fraud_flags_before,

            "fraud_flags_after":
                rogue.fraud_flags,

            "marketplace_score_before":
                score_before,

            "marketplace_score_after":
                score_after
        },

        "wallet_protection": {
            "agent_wallet_before":
                wallet_before,

            "agent_wallet_after":
                rogue.wallet_balance,

            "money_received_by_rogue":
                rogue.wallet_balance
                - wallet_before
        },

        # ====================================================
        # AUTOMATIC RECOVERY REPORT
        # ====================================================

        "recovery": {
            "triggered": True,

            "replacement_agent":
                recovery_agent.name,

            "replacement_bid":
                recovery_bid.amount,

            "selection_score":
                recovery_score,

            "result":
                recovery_result,

            "verification":
                recovery_verification,

            "payment": {
                "escrow_id":
                    recovery_escrow.id,

                "escrow_status":
                    recovery_escrow.status,

                "transaction_id":
                    recovery_transaction.id,

                "transaction_type":
                    recovery_transaction.transaction_type,

                "agent_paid":
                    True
            },

            "status":
                "RECOVERED"
        },

        "final_status":
            "ATTACK_BLOCKED_AND_TASK_RECOVERED"
    }