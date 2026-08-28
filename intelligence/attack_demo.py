from agents import agents
from worker import hotel_agent_work
from verifier import verify_hotel, update_reputation


destination = "New York"
max_price = 200


print("\n===== MALICIOUS AGENT TEST =====")


# ---------------------------------
# STEP 1: ROGUE GETS THE TASK
# ---------------------------------

rogue = next(
    agent for agent in agents
    if agent["name"] == "Rogue"
)

print("\nAgent Assigned:", rogue["name"])
print("Trust Before:", rogue["trust"])


# ---------------------------------
# STEP 2: ROGUE CHEATS
# ---------------------------------

rogue_result = hotel_agent_work(
    rogue,
    destination,
    max_price,
    malicious=True
)

print("\n===== ROGUE SUBMISSION =====")
print(rogue_result)


# ---------------------------------
# STEP 3: VERIFY ROGUE'S WORK
# ---------------------------------

verification = verify_hotel(
    rogue_result,
    destination,
    max_price
)

print("\n===== VERIFICATION =====")
print(verification)


# ---------------------------------
# STEP 4: UPDATE REPUTATION
# ---------------------------------

reputation = update_reputation(
    rogue,
    verification
)

print("\n===== REPUTATION UPDATE =====")
print(reputation)


# ---------------------------------
# STEP 5: IF FAILED, BLOCK PAYMENT
# AND REASSIGN TASK
# ---------------------------------

if not verification["passed"]:

    print("\nPAYMENT BLOCKED")
    print("Rogue failed verification.")

    # Select Atlas as replacement
    atlas = next(
        agent for agent in agents
        if agent["name"] == "Atlas"
    )

    print("\n===== TASK REASSIGNED =====")
    print("New Agent:", atlas["name"])


    # Atlas performs task honestly
    atlas_result = hotel_agent_work(
        atlas,
        destination,
        max_price
    )

    print("\n===== NEW AGENT WORK =====")
    print(atlas_result)


    # Verify Atlas
    atlas_verification = verify_hotel(
        atlas_result,
        destination,
        max_price
    )

    print("\n===== SECOND VERIFICATION =====")
    print(atlas_verification)


    # Update Atlas reputation
    atlas_reputation = update_reputation(
        atlas,
        atlas_verification
    )

    print("\n===== FINAL REPUTATION =====")
    print(atlas_reputation)


    if atlas_verification["passed"]:
        print("\nPAYMENT RELEASED TO:", atlas["name"])