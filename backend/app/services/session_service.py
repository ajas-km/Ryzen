import random
from typing import Dict, Any

# In-memory database to store active interviews
_sessions_db: Dict[str, Dict[str, Any]] = {}

def create_session(session_id: str, candidate_id: str, analysis: dict = None, role: str = None) -> Dict[str, Any]:
    """Initializes a new interview session with a random question limit."""
    _sessions_db[session_id] = {
        "session_id": session_id,
        "candidate_id": candidate_id,
        "question_count": 0,
        "min_questions": 8,
        "max_questions": 12,
        "conversation_history": [],
        "current_topic": None,
        "analysis": analysis or {},
        "role": role or "Software Developer",
        "topics_covered": [],
        "topic_question_count": {},
        "interview_qa_log": [],
        "clarification_count": 0
    }
    return _sessions_db[session_id]

def get_session(session_id: str) -> Dict[str, Any]:
    """Retrieves an existing session if it exists."""
    return _sessions_db.get(session_id)

def update_current_topic(session_id: str, topic: str):
    """Saves the current interview topic to memory."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["current_topic"] = topic

def increment_question_count(session_id: str):
    """Increases the question counter by 1."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["question_count"] += 1

def increment_clarification_count(session_id: str):
    """Increases the clarification counter by 1."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["clarification_count"] = _sessions_db[session_id].get("clarification_count", 0) + 1

def reset_clarification_count(session_id: str):
    """Resets the clarification counter to 0 (called when a new question is served)."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["clarification_count"] = 0

def update_session_history(session_id: str, role: str, message: str):
    """Appends a new message (user or system) to the chat history."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["conversation_history"].append({
            "role": role,
            "content": message
        })

def add_qa_entry(session_id: str, question: str, answer: str, evaluation: str):
    """Adds a structured Q&A entry for feedback generation."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["interview_qa_log"].append({
            "question": question,
            "answer": answer,
            "evaluation": evaluation
        })

def track_topic(session_id: str, topic: str):
    """Tracks topics covered and per-topic question counts."""
    if session_id in _sessions_db:
        session = _sessions_db[session_id]
        if topic not in session["topics_covered"]:
            session["topics_covered"].append(topic)
        session["topic_question_count"][topic] = session["topic_question_count"].get(topic, 0) + 1