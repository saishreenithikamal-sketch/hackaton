from sqlalchemy.orm import Session

from models import Agent


def update_reputation(
    db: Session,
    agent_id: int,
    passed: bool
):
    agent = (
        db.query(Agent)
        .filter(Agent.id == agent_id)
        .first()
    )

    if not agent:
        raise ValueError("Agent not found")

    if passed:

        agent.reputation = min(
            100,
            agent.reputation + 3
        )

        agent.success_rate = min(
            100,
            agent.success_rate + 1
        )

    else:

        agent.reputation = max(
            0,
            agent.reputation - 10
        )

        agent.success_rate = max(
            0,
            agent.success_rate - 5
        )

    db.commit()

    return agent