from agents import agents

hotel_database = [
    {
        "name": "Metro Hotel",
        "city": "New York",
        "price": 180
    },
    {
        "name": "Central Inn",
        "city": "New York",
        "price": 140
    },
    {
        "name": "Skyline Stay",
        "city": "New York",
        "price": 220
    }
]



def verify_hotel(result, destination, max_price):

    checks = {
        "hotel_exists": False,
        "correct_city": False,
        "price_valid": False,
        "within_budget": False
    }

    matched_hotel = None

    # Find hotel in trusted database
    for hotel in hotel_database:

        if hotel["name"].lower() == result["name"].lower():

            matched_hotel = hotel
            checks["hotel_exists"] = True
            break


    # Verify hotel details
    if matched_hotel:

        if matched_hotel["city"].lower() == destination.lower():
            checks["correct_city"] = True

        if matched_hotel["price"] == result["price"]:
            checks["price_valid"] = True

        if matched_hotel["price"] <= max_price:
            checks["within_budget"] = True


    # Calculate verification score
    passed_checks = sum(checks.values())

    score = int(
        (passed_checks / len(checks)) * 100
    )

    passed = score >= 75


    return {
        "passed": passed,
        "score": score,
        "status": "VERIFIED" if passed else "REJECTED",
        "risk": "LOW" if passed else "HIGH",
        "checks": checks,
        "message": (
            "Submission successfully verified."
            if passed
            else "Submission failed verification."
        )
    }

def update_reputation(agent, verification):

    old_trust = agent["trust"]

    if verification["passed"]:
        agent["trust"] = min(
            100,
            agent["trust"] + 2
        )

    else:
        agent["trust"] = max(
            0,
            agent["trust"] - 8
        )

    return {
        "agent": agent["name"],
        "before": old_trust,
        "after": agent["trust"],
        "change": agent["trust"] - old_trust
    }

if __name__ == "__main__":

    bad_result = {
        "name": "Luxury Manhattan Palace",
        "price": 20
    }

    verification = verify_hotel(
        bad_result,
        destination="New York",
        max_price=200
    )

    print("VERIFICATION RESULT")
    print(verification)


    rogue = agents[2]

    reputation_change = update_reputation(
        rogue,
        verification
    )

    print("\nREPUTATION UPDATE")
    print(reputation_change)