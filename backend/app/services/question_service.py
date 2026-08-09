import random
import os
from dotenv import load_dotenv
from google import genai
from app.services.curriculum_service import get_topic_objectives
# Load env
load_dotenv()

# Create client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def get_next_topic(priority_topics, topics_covered):
    for category in ["skipped", "weak", "strong"]:
        available = [
            t for t in priority_topics[category]
            if t not in topics_covered
        ]
        if available:
            return random.choice(available)
    return None


def generate_question(
    analysis: dict,
    role: str = "Software Developer",
    previous_question: str = None,
    evaluation: str = None,
    current_topic: str = None,
    topics_covered: list = None,
    topic_question_count: dict = None
    ):
    skipped = analysis.get("skipped_topics", [])
    weak = analysis.get("weak_topics", [])
    strong = analysis.get("strong_topics", [])

    topics_covered = topics_covered or []
    topic_question_count = topic_question_count or {}

    # Topic selection
    priority_topics = {
    "skipped": skipped,
    "weak": weak,
    "strong": strong
    }

    # FIRST QUESTION
    if not current_topic:
        topic = get_next_topic(priority_topics, topics_covered)
        level = "easy"

    # FOLLOW-UP
    else:
        count = topic_question_count.get(current_topic, 0)

    if evaluation == "good":
        if count < 2:
            topic = current_topic
            level = "hard"
        else:
            topic = get_next_topic(priority_topics, topics_covered)
            level = "hard"

    elif evaluation == "average":
        topic = current_topic
        level = "medium"

    elif evaluation == "poor":
        if count == 0:
            topic = current_topic
            level = "easy"
        else:
            topic = get_next_topic(priority_topics, topics_covered)
            level = "easy"

    if not topic:
        fallback = weak + strong
        topic = random.choice(fallback) if fallback else "General Programming"


    # ✅ GET CURRICULUM OBJECTIVES
    objectives = get_topic_objectives(topic)
    objectives_text = "\n".join(objectives) if objectives else "No objectives"

    # Prompt
    prompt = f"""
    You are a technical interviewer.

    Role: {role}
    Topic: {topic}
    Level: {level}

    Curriculum Focus:
    {objectives_text}

    {f"Previous Question: {previous_question}" if previous_question else ""}
    {f"Candidate performance: {evaluation}" if evaluation else ""}

    Ask ONE question.

    Rules:
    - Stay within curriculum
    - Do not repeat
    - Do not give answer
    - Be realistic
    """

    # 🔥 NEW API CALL
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    question = response.text.strip()

    return {
        "question": question,
        "topic": topic,
        "level": level
    }
