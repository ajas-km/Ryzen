import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def evaluate_answer(question: str, answer: str):
    prompt = f"""
    You are a technical interviewer.

    Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the answer.

    Return ONLY valid JSON:
    {{
        "rating": "good | average | poor",
        "reason": "short reason"
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
            "rating": "average",
            "reason": "fallback parsing"
        }
