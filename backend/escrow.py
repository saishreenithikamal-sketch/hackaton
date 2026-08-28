from sqlalchemy.orm import Session

from models import User, Agent, Escrow, Subtask


def lock_escrow(
    db: Session,
    user_id: int,
    subtask_id: int,
    agent_id: int,
    amount: float
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise ValueError("User not found")

    if user.wallet_balance < amount:
        raise ValueError("Insufficient user balance")

    # Remove money from user wallet
    user.wallet_balance -= amount

    escrow = Escrow(
        subtask_id=subtask_id,
        agent_id=agent_id,
        amount=amount,
        status="LOCKED"
    )

    db.add(escrow)
    db.commit()
    db.refresh(escrow)

    return escrow


def get_escrow(
    db: Session,
    subtask_id: int
):
    return (
        db.query(Escrow)
        .filter(
            Escrow.subtask_id == subtask_id,
            Escrow.status == "LOCKED"
        )
        .first()
    )


def release_escrow(
    db: Session,
    escrow_id: int
):
    escrow = (
        db.query(Escrow)
        .filter(Escrow.id == escrow_id)
        .first()
    )

    if not escrow:
        raise ValueError("Escrow not found")

    if escrow.status != "LOCKED":
        raise ValueError("Escrow is not locked")

    agent = (
        db.query(Agent)
        .filter(Agent.id == escrow.agent_id)
        .first()
    )

    if not agent:
        raise ValueError("Agent not found")

    agent.wallet_balance += escrow.amount

    escrow.status = "RELEASED"

    db.commit()

    return escrow


def refund_escrow(
    db: Session,
    escrow_id: int,
    user_id: int
):
    escrow = (
        db.query(Escrow)
        .filter(Escrow.id == escrow_id)
        .first()
    )

    if not escrow:
        raise ValueError("Escrow not found")

    if escrow.status != "LOCKED":
        raise ValueError("Escrow is not locked")

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise ValueError("User not found")

    user.wallet_balance += escrow.amount

    escrow.status = "REFUNDED"

    db.commit()

    return escrow