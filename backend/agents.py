from sqlalchemy.orm import Session

from backend.models import Agent


def create_agent(
    db: Session,
    name: str,
    agent_type: str,
    skills: str,
    reputation: float = 50.0,
    success_rate: float = 0.0,
    wallet_balance: float = 100.0
):
    agent = Agent(
        name=name,
        agent_type=agent_type,
        skills=skills,
        reputation=reputation,
        success_rate=success_rate,
        wallet_balance=wallet_balance,
        status="ACTIVE"
    )

    db.add(agent)
    db.commit()
    db.refresh(agent)

    return agent


def get_all_agents(db: Session):
    return db.query(Agent).all()


def get_agents_by_type(db: Session, agent_type: str):
    return (
        db.query(Agent)
        .filter(
            Agent.agent_type == agent_type,
            Agent.status == "ACTIVE"
        )
        .all()
    )


def seed_agents(db: Session):
    """
    Creates our demo agents if they don't already exist.
    """

    existing_agents = db.query(Agent).count()

    if existing_agents > 0:
        return

    agents = [
        # Flight agents
        {
            "name": "FlightBot-A",
            "agent_type": "flight",
            "skills": "flight_search,price_check",
            "reputation": 92,
            "success_rate": 95,
            "wallet_balance": 100
        },
        {
            "name": "FlightBot-B",
            "agent_type": "flight",
            "skills": "flight_search,budget_flights",
            "reputation": 85,
            "success_rate": 90,
            "wallet_balance": 100
        },
        {
            "name": "FlightBot-Rogue",
            "agent_type": "flight",
            "skills": "flight_search",
            "reputation": 35,
            "success_rate": 45,
            "wallet_balance": 100
        },

        # Hotel agents
        {
            "name": "HotelBot-A",
            "agent_type": "hotel",
            "skills": "hotel_search,availability",
            "reputation": 94,
            "success_rate": 97,
            "wallet_balance": 100
        },
        {
            "name": "HotelBot-B",
            "agent_type": "hotel",
            "skills": "hotel_search,budget_hotels",
            "reputation": 88,
            "success_rate": 92,
            "wallet_balance": 100
        },
        {
            "name": "HotelBot-Rogue",
            "agent_type": "hotel",
            "skills": "hotel_search",
            "reputation": 30,
            "success_rate": 40,
            "wallet_balance": 100
        },

        # Activity agents
        {
            "name": "ActivityBot-A",
            "agent_type": "activity",
            "skills": "activity_search,attractions",
            "reputation": 90,
            "success_rate": 94,
            "wallet_balance": 100
        },
        {
            "name": "ActivityBot-B",
            "agent_type": "activity",
            "skills": "activity_search,budget_activities",
            "reputation": 82,
            "success_rate": 88,
            "wallet_balance": 100
        }
    ]

    for agent_data in agents:
        create_agent(db, **agent_data)