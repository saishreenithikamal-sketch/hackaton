from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.database import (
    engine,
    Base,
    get_db
)

from backend import models

from backend.agents import (
    seed_agents,
    get_all_agents
)

from backend.tasks import (
    get_or_create_demo_user,
    create_trip,
    get_task,
    get_subtasks
)

from backend.orchestrator import run_trip
from backend.attack_demo import run_attack_demo


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(
    bind=engine
)


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Agent Economy API",
    description="Multi-agent travel planning economy",
    version="1.0"
)


# ============================================================
# REQUEST MODELS
# ============================================================

class TripRequest(BaseModel):

    name: str = "Demo User"

    source: str
    destination: str
    days: int
    travel_budget: float

    agent_budget: float = 100.0


class AttackDemoRequest(BaseModel):

    name: str = "Demo User"

    source: str = "Chennai"
    destination: str = "Mumbai"

    days: int = 3

    travel_budget: float = 30000

    agent_budget: float = 100.0


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Agent Economy Backend Running 🚀"
    }


# ============================================================
# SETUP DEMO
# ============================================================

@app.post("/demo/setup")
def setup_demo(
    db: Session = Depends(get_db)
):

    seed_agents(db)

    user = get_or_create_demo_user(
        db
    )

    return {
        "message": "Demo environment ready",
        "user_id": user.id,
        "agents": len(
            get_all_agents(db)
        )
    }


# ============================================================
# ADVERSARIAL ATTACK DEMO
# ============================================================

@app.post("/demo/attack")
def attack_demo(
    request: AttackDemoRequest,
    db: Session = Depends(get_db)
):

    # Make sure agents exist
    seed_agents(db)

    # Create/get demo user
    user = get_or_create_demo_user(
        db,
        request.name
    )

    # Create a separate trip for attack testing
    trip = create_trip(
        db=db,
        user_id=user.id,
        source=request.source,
        destination=request.destination,
        days=request.days,
        travel_budget=request.travel_budget,
        agent_budget=request.agent_budget
    )

    try:

        result = run_attack_demo(
            db,
            trip
        )

        return {
            "trip_id": trip.id,
            "result": result
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


# ============================================================
# GET AGENTS
# ============================================================

@app.get("/agents")
def agents(
    db: Session = Depends(get_db)
):

    all_agents = get_all_agents(db)

    return [
        {
            "id": agent.id,
            "name": agent.name,
            "type": agent.agent_type,
            "skills": agent.skills,

            "reputation": agent.reputation,
            "accuracy": agent.accuracy,
            "reliability": agent.reliability,
            "success_rate": agent.success_rate,
            "cost_efficiency": agent.cost_efficiency,

            "tasks_completed": agent.tasks_completed,
            "disputes": agent.disputes,
            "fraud_flags": agent.fraud_flags,

            "wallet_balance": agent.wallet_balance,
            "status": agent.status
        }
        for agent in all_agents
    ]


# ============================================================
# CREATE TRIP
# ============================================================

@app.post("/trip/create")
def create_new_trip(
    request: TripRequest,
    db: Session = Depends(get_db)
):

    # Make sure demo agents exist
    seed_agents(db)

    # Create/get user
    user = get_or_create_demo_user(
        db,
        request.name
    )

    # Create trip
    trip = create_trip(
        db=db,
        user_id=user.id,
        source=request.source,
        destination=request.destination,
        days=request.days,
        travel_budget=request.travel_budget,
        agent_budget=request.agent_budget
    )

    # Run Boss Agent
    results = run_trip(
        db,
        trip.id
    )

    return {
        "trip_id": trip.id,
        "user_id": user.id,
        "status": "COMPLETED",
        "results": results
    }


# ============================================================
# GET TRIP
# ============================================================

@app.get("/trip/{trip_id}")
def get_trip(
    trip_id: int,
    db: Session = Depends(get_db)
):

    trip = get_task(
        db,
        trip_id
    )

    if not trip:

        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    subtasks = get_subtasks(
        db,
        trip_id
    )

    return {
        "trip": {
            "id": trip.id,
            "source": trip.source,
            "destination": trip.destination,
            "days": trip.days,
            "travel_budget": trip.travel_budget,
            "agent_budget": trip.agent_budget,
            "status": trip.status
        },

        "subtasks": [
            {
                "id": subtask.id,
                "type": subtask.type,
                "reward": subtask.reward,
                "status": subtask.status,
                "assigned_agent_id": subtask.assigned_agent_id
            }
            for subtask in subtasks
        ]
    }