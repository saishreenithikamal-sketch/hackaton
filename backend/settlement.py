from sqlalchemy.orm import Session

from models import (
    Transaction,
    Escrow
)

from escrow import (
    release_escrow,
    refund_escrow
)

from reputation import update_reputation


def settle_task(
    db: Session,
    escrow_id: int,
    user_id: int,
    agent_id: int,
    passed: bool
):
    escrow = (
        db.query(Escrow)
        .filter(Escrow.id == escrow_id)
        .first()
    )

    if not escrow:
        raise ValueError("Escrow not found")

    amount = escrow.amount

    if passed:

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

    else:

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

    db.add(transaction)

    update_reputation(
        db,
        agent_id,
        passed
    )

    db.commit()

    return transaction