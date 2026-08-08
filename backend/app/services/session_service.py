import random
from typing import Dict, Any, List

_sessions_db: Dict[str, Dict[str, Any]] = {}

def create_session(session_id: str, candidate_id: str) -> Dict[str, Any]:
    """Initializes a new interview session with a random question limit."""
    _sessions_db[session_id] = {
        "session_id": session_id,
        "candidate_id": candidate_id,
        "question_count": 0,
        "target_questions": random.randint(8, 14),  # Sets the interview length!
        "conversation_history": [],
        "current_topic": None
    }
    return _sessions_db[session_id]

# ... Keep the rest of your functions (get_session, update_history, etc.) exactly the same