from verifier import hotel_database


def hotel_agent_work(agent, destination, max_price):
    """
    Worker agent searches for a suitable hotel.
    """

    possible_hotels = []

    # Search hotels matching the task
    for hotel in hotel_database:

        if (
            hotel["city"].lower() == destination.lower()
            and hotel["price"] <= max_price
        ):
            possible_hotels.append(hotel)

    # No suitable hotel
    if not possible_hotels:
        return None

    # Choose cheapest valid hotel
    best_hotel = min(
        possible_hotels,
        key=lambda hotel: hotel["price"]
    )

    return {
        "agent": agent["name"],
        "name": best_hotel["name"],
        "price": best_hotel["price"]
    }