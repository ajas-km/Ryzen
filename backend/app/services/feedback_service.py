import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_feedback(history: list):
    conversation = ""

    for i, item in enumerate(history, 1):
        conversation += f"""
        Q{i}: {item.get("question")}
        A{i}: {item.get("answer")}
        Rating: {item.get("evaluation")}
        """

    prompt = f"""
    You are a senior technical interviewer.

    Based on the interview conversation below:

    {conversation}

    Generate structured feedback.

    Return ONLY valid JSON:

    {{
        "summary": "overall performance summary",
        "strengths": ["point1", "point2"],
        "gaps": ["point1", "point2"],
        "next": ["suggestion1", "suggestion2"]
    }}
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    try:
        return json.loads(response.text)
    except:
        return {
            "summary": "Could not parse feedback",
            "strengths": [],
            "gaps": [],
            "next": []
        }
