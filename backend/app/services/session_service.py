import random
from typing import Dict, Any

# In-memory database to store active interviews
_sessions_db: Dict[str, Dict[str, Any]] = {}

def create_session(session_id: str, candidate_id: str) -> Dict[str, Any]:
    """Initializes a new interview session with a random question limit."""
    _sessions_db[session_id] = {
        "session_id": session_id,
        "candidate_id": candidate_id,
        "question_count": 0,
        # Set to 2 for quick testing! Change to random.randint(8, 14) for production.
        "target_questions": 2,  
        "conversation_history": [],
        "current_topic": None
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

def update_session_history(session_id: str, role: str, message: str):
    """Appends a new message (user or system) to the chat history."""
    if session_id in _sessions_db:
        _sessions_db[session_id]["conversation_history"].append({
            "role": role,
            "content": message
        })