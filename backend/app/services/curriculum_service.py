import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "curriculum.json")

with open(DATA_PATH, "r", encoding="utf-8") as file:
    curriculum_data = json.load(file)


def get_topic_objectives(topic: str):
    for day in curriculum_data.get("days", []):
        if topic.lower() in day.get("title", "").lower():
            return day.get("objectives", [])

    return []