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