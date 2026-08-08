import random
import os
from dotenv import load_dotenv
from google import genai

# Load env
load_dotenv()

# Create client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_question(analysis: dict, role: str = "Software Developer"):
    skipped = analysis.get("skipped_topics", [])
    weak = analysis.get("weak_topics", [])
    strong = analysis.get("strong_topics", [])

    # Topic selection
    if skipped:
        topic = random.choice(skipped)
        level = "easy"
    elif weak:
        topic = random.choice(weak)
        level = "easy"
    elif strong:
        topic = random.choice(strong)
        level = "medium"
    else:
        topic = random.choice(["Arrays", "OOP", "APIs", "Databases"])
        level = "easy"

    # Prompt
    prompt = f"""
    You are a technical interviewer.

    Ask ONE {level}-level interview question for a {role} candidate.

    Topic: {topic}

    Rules:
    - Do not give answer
    - Keep it realistic
    - Be clear and professional
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