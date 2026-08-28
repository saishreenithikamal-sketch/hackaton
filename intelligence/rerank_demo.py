from agents import agents
from scoring import rank_agents, calculate_agent_score
from worker import hotel_agent_work
from verifier import verify_hotel, update_reputation


destination = "New York"
max_price = 200


# ---------------------------------
# STEP 1: SHOW INITIAL RANKING
# ---------------------------------

print("\n===== BEFORE BAD BEHAVIOUR =====")

before_ranking = rank_agents()

for agent in before_ranking:
    print(
        agent["name"],
        "-> Score:",
        agent["score"],
        "| Trust:",
        agent["trust"]
    )


# ---------------------------------
# STEP 2: GET ROGUE AGENT
# ---------------------------------

rogue = next(
    agent for agent in agents
    if agent["name"] == "Rogue"
)

old_score = calculate_agent_score(rogue)

print("\nRogue BEFORE failure")
print("Trust:", rogue["trust"])
print("Overall Score:", old_score)


# ---------------------------------
# STEP 3: ROGUE PERFORMS BAD WORK
# ---------------------------------

rogue_result = hotel_agent_work(
    rogue,
    destination,
    max_price,
    malicious=True
)

print("\n===== ROGUE WORK =====")
print(rogue_result)


# ---------------------------------
# STEP 4: VERIFY THE WORK
# ---------------------------------

verification = verify_hotel(
    rogue_result,
    destination,
    max_price
)

print("\n===== VERIFICATION =====")
print("Status:", verification["status"])
print("Score:", verification["score"])
print("Risk:", verification["risk"])


# ---------------------------------
# STEP 5: UPDATE REPUTATION
# ---------------------------------

reputation_change = update_reputation(
    rogue,
    verification
)

print("\n===== REPUTATION CHANGE =====")
print(
    reputation_change["before"],
    "->",
    reputation_change["after"]
)


# ---------------------------------
# STEP 6: RECALCULATE SCORE
# ---------------------------------

new_score = calculate_agent_score(rogue)

print("\nRogue AFTER failure")
print("Trust:", rogue["trust"])
print("Old Overall Score:", old_score)
print("New Overall Score:", new_score)
print("Score Change:", round(new_score - old_score, 2))


# ---------------------------------
# STEP 7: RANK EVERYONE AGAIN
# ---------------------------------

print("\n===== NEW AGENT RANKING =====")

after_ranking = rank_agents()

for agent in after_ranking:
    print(
        agent["name"],
        "-> Score:",
        agent["score"],
        "| Trust:",
        agent["trust"]
    )