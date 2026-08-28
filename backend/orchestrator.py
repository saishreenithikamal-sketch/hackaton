from sqlalchemy.orm import Session

from models import Task, Subtask

from tasks import create_subtask

from marketplace import (
    generate_bids,
    select_best_agent
)

from escrow import lock_escrow

from settlement import settle_task


def decompose_trip(
    db: Session,
    task: Task
):
    """
    Boss Robot breaks the trip into smaller jobs.
    """

    subtasks = []

    subtasks.append(
        create_subtask(
            db,
            task.id,
            "flight",
            15
        )
    )

    subtasks.append(
        create_subtask(
            db,
            task.id,
            "hotel",
            15
        )
    )

    subtasks.append(
        create_subtask(
            db,
            task.id,
            "activity",
            10
        )
    )

    return subtasks


def mock_verifier(
    subtask: Subtask,
    agent,
    result
):
    """
    TEMPORARY verifier.

    Later your ML teammate's verifier will replace this.

    For now, normal agents pass.
    Rogue agents fail.
    """

    if "Rogue" in agent.name:

        return {
            "score": 20,
            "passed": False,
            "reason": "Agent returned suspicious or invalid data."
        }

    return {
        "score": 95,
        "passed": True,
        "reason": "Result passed all demo verification checks."
    }


def execute_agent(
    subtask: Subtask,
    agent
):
    """
    TEMPORARY agent execution.

    Later this can call real travel APIs or
    your specialized agent services.
    """

    if subtask.type == "flight":

        return {
            "type": "flight",
            "from": "Toronto",
            "to": "New York",
            "price": 240
        }

    if subtask.type == "hotel":

        return {
            "type": "hotel",
            "name": "Manhattan Stay",
            "city": "New York",
            "price_per_night": 120
        }

    if subtask.type == "activity":

        return {
            "type": "activity",
            "name": "Central Park",
            "price": 0
        }

    return {}


def process_subtask(
    db: Session,
    task: Task,
    subtask: Subtask
):
    # ------------------------------------------
    # 1. Agents submit bids
    # ------------------------------------------

    bids = generate_bids(
        db,
        subtask
    )

    if not bids:
        subtask.status = "FAILED"
        db.commit()

        return {
            "status": "FAILED",
            "reason": "No agents available."
        }

    # ------------------------------------------
    # 2. Select best agent
    # ------------------------------------------

    selection = select_best_agent(
        db,
        subtask.id
    )

    if not selection:

        subtask.status = "FAILED"
        db.commit()

        return {
            "status": "FAILED",
            "reason": "Could not select agent."
        }

    agent = selection["agent"]
    bid = selection["bid"]

    # ------------------------------------------
    # 3. Lock payment
    # ------------------------------------------

    escrow = lock_escrow(
        db,
        task.user_id,
        subtask.id,
        agent.id,
        bid.amount
    )

    # ------------------------------------------
    # 4. Agent performs task
    # ------------------------------------------

    result = execute_agent(
        subtask,
        agent
    )

    # ------------------------------------------
    # 5. TEMPORARY verification
    # ------------------------------------------

    verification = mock_verifier(
        subtask,
        agent,
        result
    )

    # ------------------------------------------
    # 6. Settlement
    # ------------------------------------------

    transaction = settle_task(
        db,
        escrow.id,
        task.user_id,
        agent.id,
        verification["passed"]
    )

    if verification["passed"]:

        subtask.status = "COMPLETED"

    else:

        subtask.status = "FAILED"

    db.commit()

    return {
        "subtask_id": subtask.id,
        "agent": agent.name,
        "bid": bid.amount,
        "verification": verification,
        "transaction_id": transaction.id,
        "status": subtask.status
    }


def run_trip(
    db: Session,
    task_id: int
):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise ValueError("Trip not found")

    task.status = "PLANNING"
    db.commit()

    # ------------------------------------------
    # Boss decomposes trip
    # ------------------------------------------

    subtasks = decompose_trip(
        db,
        task
    )

    results = []

    # ------------------------------------------
    # Process every subtask
    # ------------------------------------------

    for subtask in subtasks:

        result = process_subtask(
            db,
            task,
            subtask
        )

        results.append(result)

    task.status = "COMPLETED"

    db.commit()

    return results