from sqlalchemy.orm import Session

from backend.models import Agent, Subtask, Bid
from intelligence.scoring import calculate_marketplace_score


# ============================================================
# CREATE BID
# ============================================================

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


# ============================================================
# GENERATE BIDS
# ============================================================

def generate_bids(
    db: Session,
    subtask: Subtask
):
    """
    Demo bidding system.

    Active agents matching the subtask type
    automatically submit bids.
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
            amount = max(
                1,
                subtask.reward - 2
            )

        else:
            amount = max(
                1,
                subtask.reward - 5
            )

        bid = create_bid(
            db=db,
            subtask_id=subtask.id,
            agent_id=agent.id,
            amount=amount
        )

        bids.append(bid)

    return bids


# ============================================================
# SELECT BEST AGENT
# ============================================================

def select_best_agent(
    db: Session,
    subtask_id: int
):
    """
    Select the best agent using the
    intelligence trust/risk scoring engine.
    """

    # Get all bids for this subtask
    bids = (
        db.query(Bid)
        .filter(
            Bid.subtask_id == subtask_id
        )
        .all()
    )

    if not bids:
        return None

    scored_bids = []

    # --------------------------------------------------------
    # SCORE EVERY AGENT
    # --------------------------------------------------------

    for bid in bids:

        agent = (
            db.query(Agent)
            .filter(
                Agent.id == bid.agent_id
            )
            .first()
        )

        if not agent:
            continue

        # ----------------------------------------------------
        # INTELLIGENCE ENGINE
        # ----------------------------------------------------

        score = calculate_marketplace_score(
            agent,
            bid.amount
        )

        scored_bids.append(
            (
                score,
                bid,
                agent
            )
        )

    if not scored_bids:
        return None

    # --------------------------------------------------------
    # RANK AGENTS
    # --------------------------------------------------------

    scored_bids.sort(
        key=lambda x: x[0],
        reverse=True
    )

    winning_score, winning_bid, winning_agent = (
        scored_bids[0]
    )

    # --------------------------------------------------------
    # ACCEPT WINNER
    # --------------------------------------------------------

    winning_bid.status = "ACCEPTED"

    # --------------------------------------------------------
    # REJECT OTHER BIDS
    # --------------------------------------------------------

    for _, bid, _ in scored_bids[1:]:
        bid.status = "REJECTED"

    # --------------------------------------------------------
    # ASSIGN WINNING AGENT TO SUBTASK
    # --------------------------------------------------------

    subtask = (
        db.query(Subtask)
        .filter(
            Subtask.id == subtask_id
        )
        .first()
    )

    if not subtask:
        return None

    subtask.assigned_agent_id = (
        winning_agent.id
    )

    subtask.status = "ASSIGNED"

    db.commit()

    # --------------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------------

    return {
        "agent": winning_agent,
        "bid": winning_bid,
        "score": winning_score
    }