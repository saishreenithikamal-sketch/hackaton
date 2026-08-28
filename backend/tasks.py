from sqlalchemy.orm import Session

from models import User, Task, Subtask


def create_user(
    db: Session,
    name: str
):
    user = User(
        name=name,
        wallet_balance=1000.0
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_or_create_demo_user(
    db: Session,
    name: str = "Demo User"
):
    user = (
        db.query(User)
        .filter(User.name == name)
        .first()
    )

    if user:
        return user

    return create_user(db, name)


def create_trip(
    db: Session,
    user_id: int,
    source: str,
    destination: str,
    days: int,
    travel_budget: float,
    agent_budget: float
):
    trip = Task(
        user_id=user_id,
        source=source,
        destination=destination,
        days=days,
        travel_budget=travel_budget,
        agent_budget=agent_budget,
        status="CREATED"
    )

    db.add(trip)
    db.commit()
    db.refresh(trip)

    return trip


def create_subtask(
    db: Session,
    task_id: int,
    subtask_type: str,
    reward: float
):
    subtask = Subtask(
        task_id=task_id,
        type=subtask_type,
        reward=reward,
        status="OPEN"
    )

    db.add(subtask)
    db.commit()
    db.refresh(subtask)

    return subtask


def get_task(
    db: Session,
    task_id: int
):
    return (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )


def get_subtasks(
    db: Session,
    task_id: int
):
    return (
        db.query(Subtask)
        .filter(Subtask.task_id == task_id)
        .all()
    )