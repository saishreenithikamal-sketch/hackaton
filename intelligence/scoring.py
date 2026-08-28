from agents import agents


# 1. Calculate overall score of an agent
def calculate_agent_score(agent):
    score = (
        agent["trust"] * 0.30
        + agent["accuracy"] * 0.25
        + agent["reliability"] * 0.20
        + agent["success_rate"] * 0.15
        + agent["cost_efficiency"] * 0.10
    )

    # Penalties for suspicious behaviour
    score -= agent["fraud_flags"] * 5
    score -= agent["disputes"] * 1

    return round(score, 2)


# 2. Explain why an agent is trustworthy
def explain_agent(agent):
    reasons = []

    if agent["trust"] >= 85:
        reasons.append("High trust score")

    if agent["accuracy"] >= 90:
        reasons.append("High verified accuracy")

    if agent["reliability"] >= 90:
        reasons.append("Strong reliability")

    if agent["fraud_flags"] == 0:
        reasons.append("No fraud history")

    if agent["disputes"] <= 1:
        reasons.append("Low dispute history")

    return reasons


# 3. Explain why an agent is risky
def explain_risk(agent):
    warnings = []

    if agent["trust"] < 60:
        warnings.append("Low trust score")

    if agent["accuracy"] < 70:
        warnings.append("Low historical accuracy")

    if agent["reliability"] < 70:
        warnings.append("Poor reliability")

    if agent["fraud_flags"] > 0:
        warnings.append(
            f'{agent["fraud_flags"]} fraud flag(s)'
        )

    if agent["disputes"] >= 3:
        warnings.append("High dispute history")

    return warnings


# 4. Rank all agents
def rank_agents():
    ranked = []

    for agent in agents:
        score = calculate_agent_score(agent)

        ranked.append({
            "name": agent["name"],
            "score": score,
            "trust": agent["trust"],
            "accuracy": agent["accuracy"],
            "reliability": agent["reliability"],
            "bid": agent["bid"],
            "fraud_flags": agent["fraud_flags"],
            "reasons": explain_agent(agent),
            "warnings": explain_risk(agent)
        })

    # Highest score comes first
    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return ranked


# 5. Test the ranking
if __name__ == "__main__":

    result = rank_agents()

    for agent in result:
        print(agent)

    print("\nSelected Agent:", result[0]["name"])