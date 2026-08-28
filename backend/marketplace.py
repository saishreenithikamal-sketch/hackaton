from sqlalchemy.orm import Session

from models import Agent, Subtask, Bid


def create_bid(
    db: Session,
    subtask_id: int,
    agent_id: int,
    amount: float
):
    bid = Bid(
        subtask_id=subtask_id,
        agent_id=agent_id,
        amount=amount,
        status="PENDING"
    )

    db.add(bid)
    db.commit()
    db.refresh(bid)

    return bid


def generate_bids(
    db: Session,
    subtask: Subtask
):
    """
    Demo bidding system.

    In the real version, agents would independently
    submit bids.
    """

    agents = (
        db.query(Agent)
        .filter(
            Agent.agent_type == subtask.type,
            Agent.status == "ACTIVE"
        )
        .all()
    )

    bids = []

    for agent in agents:

        # Simple demo pricing
        if agent.reputation >= 90:
            amount = subtask.reward

        elif agent.reputation >= 70:
            amount = max(1, subtask.reward - 2)

        else:
            amount = max(1, subtask.reward - 5)

        bid = create_bid(
            db,
            subtask.id,
            agent.id,
            amount
        )

        bids.append(bid)

    return bids


def select_best_agent(
    db: Session,
    subtask_id: int
):
    bids = (
        db.query(Bid)
        .filter(Bid.subtask_id == subtask_id)
        .all()
    )

    if not bids:
        return None

    scored_bids = []

    for bid in bids:

        agent = (
            db.query(Agent)
            .filter(Agent.id == bid.agent_id)
            .first()
        )

        if not agent:
            continue

        # Higher reputation + lower price = better
        score = (
            agent.reputation * 0.7
            + agent.success_rate * 0.2
            - bid.amount * 0.1
        )

        scored_bids.append(
            (score, bid, agent)
        )

    if not scored_bids:
        return None

    scored_bids.sort(
        key=lambda x: x[0],
        reverse=True
    )

    winning_score, winning_bid, winning_agent = scored_bids[0]

    # Mark winner
    winning_bid.status = "ACCEPTED"

    # Mark everyone else rejected
    for _, bid, _ in scored_bids[1:]:
        bid.status = "REJECTED"

    subtask = (
        db.query(Subtask)
        .filter(Subtask.id == subtask_id)
        .first()
    )

    subtask.assigned_agent_id = winning_agent.id
    subtask.status = "ASSIGNED"

    db.commit()

    return {
        "agent": winning_agent,
        "bid": winning_bid,
        "score": winning_score
    }