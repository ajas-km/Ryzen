from typing import Dict, Any, List

# In-memory dictionary to store active interview sessions
# Structure: { "session_id": { "candidate_id": "...", "question_count": 0, ... } }
_sessions_db: Dict[str, Dict[str, Any]] = {}

def create_session(session_id: str, candidate_id: str) -> Dict[str, Any]:
    """Initializes a new interview session."""
    _sessions_db[session_id] = {
        "session_id": session_id,
        "candidate_id": candidate_id,
        "question_count": 0,
        "conversation_history": [],
        "current_topic": None
    }
    return _sessions_db[session_id]

def get_session(session_id: str) -> Dict[str, Any]:
    """Retrieves an existing session by ID."""
    return _sessions_db.get(session_id)

def update_session_history(session_id: str, role: str, content: str):
    """Appends a message to the conversation history (role: 'user' or 'system')."""
    session = get_session(session_id)
    if session:
        session["conversation_history"].append({"role": role, "content": content})

def increment_question_count(session_id: str):
    """Increments the number of questions asked so far."""
    session = get_session(session_id)
    if session:
        session["question_count"] += 1

def update_current_topic(session_id: str, topic: str):
    """Updates the topic currently being evaluated."""
    session = get_session(session_id)
    if session:
        session["current_topic"] = topic