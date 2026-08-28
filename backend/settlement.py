from sqlalchemy.orm import Session

from backend.models import (
    Transaction,
    Escrow
)

from backend.escrow import (
    release_escrow,
    refund_escrow
)

from backend.reputation import update_reputation


def settle_task(
    db: Session,
    escrow_id: int,
    user_id: int,
    agent_id: int,
    passed: bool
):
    # Get escrow record
    escrow = (
        db.query(Escrow)
        .filter(Escrow.id == escrow_id)
        .first()
    )

    if not escrow:
        raise ValueError("Escrow not found")

    amount = escrow.amount

    # ========================================================
    # VERIFICATION PASSED
    # ========================================================

    if passed:

        # Release escrow payment to agent
        release_escrow(
            db,
            escrow_id
        )

        transaction = Transaction(
            from_type="ESCROW",
            from_id=escrow_id,
            to_type="AGENT",
            to_id=agent_id,
            amount=amount,
            transaction_type="TASK_PAYMENT",
            status="COMPLETED"
        )

    # ========================================================
    # VERIFICATION FAILED
    # ========================================================

    else:

        # Refund escrow money to user
        refund_escrow(
            db,
            escrow_id,
            user_id
        )

        transaction = Transaction(
            from_type="ESCROW",
            from_id=escrow_id,
            to_type="USER",
            to_id=user_id,
            amount=amount,
            transaction_type="TASK_REFUND",
            status="COMPLETED"
        )

    # Store transaction
    db.add(transaction)

    # Update agent reputation
    update_reputation(
        db,
        agent_id,
        passed
    )

    db.commit()

    return transaction