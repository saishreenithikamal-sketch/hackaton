from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import (
    engine,
    Base,
    get_db
)

import models

from agents import (
    seed_agents,
    get_all_agents
)

from tasks import (
    get_or_create_demo_user,
    create_trip,
    get_task,
    get_subtasks
)

from orchestrator import run_trip


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Agent Economy API",
    description="Multi-agent travel planning economy",
    version="1.0"
)


# ============================================================
# REQUEST MODEL
# ============================================================

class TripRequest(BaseModel):

    name: str = "Demo User"

    source: str

    destination: str

    days: int

    travel_budget: float

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
        "agents": len(get_all_agents(db))
    }


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
            "success_rate": agent.success_rate,
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