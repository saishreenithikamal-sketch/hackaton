from agents import agents
from scoring import rank_agents
from worker import hotel_agent_work
from verifier import verify_hotel, update_reputation


# ---------------------------------
# STEP 1: USER TASK
# ---------------------------------

destination = "New York"
max_price = 200

print("\n===== NEW HOTEL TASK =====")

print("Destination:", destination)
print("Maximum Price:", max_price)


# ---------------------------------
# STEP 2: AGENTS COMPETE
# ---------------------------------

ranking = rank_agents()

print("\n===== AGENT RANKING =====")

for agent in ranking:
    print(
        agent["name"],
        "-> Score:",
        agent["score"]
    )


# ---------------------------------
# STEP 3: SELECT BEST AGENT
# ---------------------------------

selected_name = ranking[0]["name"]

selected_agent = next(
    agent
    for agent in agents
    if agent["name"] == selected_name
)

print("\nSelected Agent:", selected_agent["name"])


# ---------------------------------
# STEP 4: AGENT ACTUALLY WORKS
# ---------------------------------

worker_result = hotel_agent_work(
    selected_agent,
    destination,
    max_price
)

print("\n===== AGENT WORK =====")
print(worker_result)


# ---------------------------------
# STEP 5: VERIFY AGENT WORK
# ---------------------------------

if worker_result is not None:

    verification = verify_hotel(
        worker_result,
        destination,
        max_price
    )

    print("\n===== VERIFICATION =====")
    print(verification)


    # ---------------------------------
    # STEP 6: UPDATE REPUTATION
    # ---------------------------------

    reputation = update_reputation(
        selected_agent,
        verification
    )

    print("\n===== REPUTATION =====")
    print(reputation)

else:
    print("\nAgent could not find a suitable hotel.")