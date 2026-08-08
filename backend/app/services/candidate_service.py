import json
import os

# 🔹 Get absolute path to candidates.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "candidates.json")

# 🔹 Load JSON ONCE when file is imported
with open(DATA_PATH, "r", encoding="utf-8") as file:
    candidates_data = json.load(file)


# 🔹 Function: Get candidate by ID
def get_candidate_by_id(candidate_id: str):
    """
    Returns full candidate data based on candidate_id.
    If not found, returns None.
    """

    for candidate in candidates_data.get("candidates", []):
        if candidate.get("member", {}).get("id") == candidate_id:
            return candidate

    return None

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