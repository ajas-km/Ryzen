from app.services import session_service
from app.services.candidate_service import analyze_candidate
from app.services.question_service import generate_question

def start_interview(session_id: str, candidate_data: dict) -> str:
    """
    Handles the initialization of an interview session:
    1. Analyzes candidate data
    2. Determines initial topic
    3. Generates first question
    4. Saves state in memory
    """
    # 1. Analyze profile via Dev 2 service
    analysis = analyze_candidate(candidate_data)
    topic = analysis.get("start_topic", "General AI Concepts")
    level = analysis.get("start_level", "intermediate")
    
    # 2. Generate initial question via Dev 2 service
    first_question = generate_question(topic, level)
    
    # 3. Create session & initialize state
    candidate_id = candidate_data.get("member", {}).get("id", "UNKNOWN")
    session_service.create_session(session_id, candidate_id)
    
    # 4. Record question details
    session_service.update_current_topic(session_id, topic)
    session_service.increment_question_count(session_id)
    session_service.update_session_history(session_id, "system", first_question)
    
    return first_question