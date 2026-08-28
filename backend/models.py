from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey,
    Text
)

from sqlalchemy.orm import relationship

from database import Base


# ============================================================
# USER
# ============================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    wallet_balance = Column(Float, default=100.0)

    tasks = relationship(
        "Task",
        back_populates="user"
    )


# ============================================================
# AGENT
# ============================================================

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    agent_type = Column(String, nullable=False)

    skills = Column(String, default="")

    reputation = Column(Float, default=50.0)

    success_rate = Column(Float, default=0.0)

    wallet_balance = Column(Float, default=0.0)

    status = Column(
        String,
        default="ACTIVE"
    )

    bids = relationship(
        "Bid",
        back_populates="agent"
    )

    subtasks = relationship(
        "Subtask",
        back_populates="assigned_agent"
    )


# ============================================================
# MAIN TRIP TASK
# ============================================================

class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    source = Column(String, nullable=False)

    destination = Column(String, nullable=False)

    days = Column(Integer, nullable=False)

    travel_budget = Column(Float, nullable=False)

    agent_budget = Column(Float, nullable=False)

    status = Column(
        String,
        default="CREATED"
    )

    user = relationship(
        "User",
        back_populates="tasks"
    )

    subtasks = relationship(
        "Subtask",
        back_populates="task"
    )


# ============================================================
# SUBTASK
# ============================================================

class Subtask(Base):
    __tablename__ = "subtasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    task_id = Column(
        Integer,
        ForeignKey("tasks.id"),
        nullable=False
    )

    type = Column(
        String,
        nullable=False
    )

    reward = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="OPEN"
    )

    assigned_agent_id = Column(
        Integer,
        ForeignKey("agents.id"),
        nullable=True
    )

    task = relationship(
        "Task",
        back_populates="subtasks"
    )

    assigned_agent = relationship(
        "Agent",
        back_populates="subtasks"
    )

    bids = relationship(
        "Bid",
        back_populates="subtask"
    )


# ============================================================
# BID
# ============================================================

class Bid(Base):
    __tablename__ = "bids"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    subtask_id = Column(
        Integer,
        ForeignKey("subtasks.id"),
        nullable=False
    )

    agent_id = Column(
        Integer,
        ForeignKey("agents.id"),
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="PENDING"
    )

    subtask = relationship(
        "Subtask",
        back_populates="bids"
    )

    agent = relationship(
        "Agent",
        back_populates="bids"
    )


# ============================================================
# ESCROW
# ============================================================

class Escrow(Base):
    __tablename__ = "escrows"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    subtask_id = Column(
        Integer,
        ForeignKey("subtasks.id"),
        nullable=False
    )

    agent_id = Column(
        Integer,
        ForeignKey("agents.id"),
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    status = Column(
        String,
        default="LOCKED"
    )


# ============================================================
# VERIFICATION
# ============================================================

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    subtask_id = Column(
        Integer,
        ForeignKey("subtasks.id"),
        nullable=False
    )

    agent_id = Column(
        Integer,
        ForeignKey("agents.id"),
        nullable=False
    )

    score = Column(
        Float,
        nullable=False
    )

    passed = Column(
        Boolean,
        nullable=False
    )

    reason = Column(
        Text,
        default=""
    )


# ============================================================
# TRANSACTION
# ============================================================

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    from_type = Column(String, nullable=False)

    from_id = Column(Integer, nullable=False)

    to_type = Column(String, nullable=False)

    to_id = Column(Integer, nullable=False)

    amount = Column(
        Float,
        nullable=False
    )

    transaction_type = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="COMPLETED"
    )