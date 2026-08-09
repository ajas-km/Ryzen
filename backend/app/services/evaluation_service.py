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

    Rules:
    - If the candidate explicitly asks to clarify, explain, or rephrase the question (e.g., "can you explain", "clarify the question"), rate it as "clarify".
    - If the candidate says "I don't know", "I'm not sure", or asks to skip to the next question (e.g., "next", "next qn pls", "skip"), rate it as "dont_know".
    - If the answer is meaningless, random keyboard smashes (e.g., "sdvsvsvse"), gibberish, or completely unrelated, rate it as "invalid".
    - Otherwise rate it as "good", "average", or "poor" based on technical accuracy.

    Return ONLY valid JSON without any markdown formatting:
    {{
        "rating": "good | average | poor | invalid | clarify | dont_know",
        "reason": "short reason"
    }}
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    try:
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        return json.loads(text.strip())
    except Exception as e:
        print(f"JSON Parsing Error: {e} - Raw text: {response.text}")
        return {
            "rating": "average",
            "reason": "fallback parsing"
        }
