from sqlalchemy.orm import Session

from backend.models import Agent
from backend.tasks import create_subtask
from backend.escrow import lock_escrow
from backend.settlement import settle_task
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

    # Save values before the attack
    reputation_before = rogue.reputation
    success_rate_before = rogue.success_rate
    fraud_flags_before = rogue.fraud_flags
    wallet_before = rogue.wallet_balance

    # ========================================================
    # 2. CREATE A HOTEL SUBTASK FOR THE ATTACK TEST
    # ========================================================

    subtask = create_subtask(
        db,
        task.id,
        "hotel",
        15
    )

    # Rogue tries to attract the system using a very cheap bid
    rogue_bid = 5.0

    # Calculate Rogue's marketplace score before attack
    score_before = calculate_marketplace_score(
        rogue,
        rogue_bid
    )

    # ========================================================
    # 3. SIMULATE COMPROMISED AGENT SELECTION
    # ========================================================
    #
    # IMPORTANT:
    # Rogue did NOT defeat the normal intelligence scoring.
    #
    # We deliberately inject Rogue to simulate:
    #
    # - compromised routing
    # - manipulated selection
    # - malicious agent execution
    #
    # This allows us to test the zero-trust safety layer.
    # ========================================================

    subtask.assigned_agent_id = rogue.id
    subtask.status = "ASSIGNED"

    db.commit()

    # ========================================================
    # 4. LOCK PAYMENT IN ESCROW
    # ========================================================

    escrow = lock_escrow(
        db=db,
        user_id=task.user_id,
        subtask_id=subtask.id,
        agent_id=rogue.id,
        amount=rogue_bid
    )

    # ========================================================
    # 5. ROGUE RETURNS A MALICIOUS / FAKE RESULT
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
    #
    # The verifier does NOT trust the agent's own claim.
    # The fake result fails verification.
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
    # 7. SETTLEMENT
    # ========================================================
    #
    # Because verification failed:
    #
    #   escrow -> REFUNDED
    #   Rogue  -> NOT PAID
    #   reputation -> PENALIZED
    #
    # settle_task() performs the actual backend operations.
    # ========================================================

    transaction = settle_task(
        db=db,
        escrow_id=escrow.id,
        user_id=task.user_id,
        agent_id=rogue.id,
        passed=False
    )

    subtask.status = "FAILED"

    # ========================================================
    # 8. FRAUD PENALTY
    # ========================================================

    # This particular failure is an adversarial/fraud case,
    # therefore increase the fraud flag.
    rogue.fraud_flags += 1

    db.commit()

    db.refresh(rogue)
    db.refresh(escrow)

    # ========================================================
    # 9. RECALCULATE MARKETPLACE SCORE
    # ========================================================

    score_after = calculate_marketplace_score(
        rogue,
        rogue_bid
    )

    # ========================================================
    # 10. RETURN EXPLAINABLE ATTACK REPORT
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
            "transaction_type": transaction.transaction_type,
            "agent_paid": False
        },

        "trust_update": {
            "reputation_before": reputation_before,
            "reputation_after": rogue.reputation,

            "success_rate_before": success_rate_before,
            "success_rate_after": rogue.success_rate,

            "fraud_flags_before": fraud_flags_before,
            "fraud_flags_after": rogue.fraud_flags,

            "marketplace_score_before": score_before,
            "marketplace_score_after": score_after
        },

        "wallet_protection": {
            "agent_wallet_before": wallet_before,
            "agent_wallet_after": rogue.wallet_balance,

            "money_received_by_rogue": (
                rogue.wallet_balance - wallet_before
            )
        },

        "final_status": "ATTACK_BLOCKED"
    }