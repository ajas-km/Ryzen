

def analyze_candidate(candidate_data: dict):
    """
    Analyze candidate performance and classify topics.
    Returns weak, strong, and skipped topics.
    """

    weak_topics = []
    strong_topics = []
    skipped_topics = []

    missions = candidate_data.get("missions", [])

    for mission in missions:
        title = mission.get("title", "Unknown Topic")
        attempts = mission.get("attempts", 0)
        skipped = mission.get("skipped", False)

        if skipped:
            skipped_topics.append(title)

        elif attempts >= 3:
            weak_topics.append(title)

        elif attempts == 1:
            strong_topics.append(title)

    return {
        "weak_topics": weak_topics,
        "strong_topics": strong_topics,
        "skipped_topics": skipped_topics
    }