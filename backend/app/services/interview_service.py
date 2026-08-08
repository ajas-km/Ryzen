from app.services import session_service
from app.services.candidate_service import analyze_candidate
from app.services.question_service import generate_question, generate_next_question
from app.services.evaluation_service import evaluate_answer
from app.services.feedback_service import generate_feedback

def start_interview(session_id: str, candidate_data: dict) -> dict:
    """Handles the initialization of an interview session."""
    analysis = analyze_candidate(candidate_data)
    topic = analysis.get("start_topic", "General AI Concepts")
    level = analysis.get("start_level", "intermediate")
    
    first_question = generate_question(topic, level)
    
    candidate_id = candidate_data.get("member", {}).get("id", "UNKNOWN")
    session_service.create_session(session_id, candidate_id)
    
    session_service.update_current_topic(session_id, topic)
    session_service.increment_question_count(session_id)
    session_service.update_session_history(session_id, "system", first_question)
    
    return {
        "reply": first_question,
        "done": False
    }

def continue_interview(session_id: str, message: str) -> dict:
    """Handles an ongoing interview turn and checks for termination."""
    session = session_service.get_session(session_id)
    
    # 1. Evaluate answer
    last_question = "Previous question context" 
    evaluation = evaluate_answer(last_question, message)
    session_service.increment_question_count(session_id)
    
    # 2. Check if we have reached the target number of questions
    if session["question_count"] >= session["target_questions"]:
        # We are done! Generate feedback.
        history = session.get("conversation_history", [])
        feedback = generate_feedback(history)
        
        final_reply = f"[{evaluation['score'].upper()}] {evaluation['feedback']} That concludes our technical interview today. Thank you for your time!"
        session_service.update_session_history(session_id, "system", final_reply)
        
        return {
            "reply": final_reply,
            "done": True,
            "feedback": feedback
        }
    
    # 3. Otherwise, continue with the next question
    history = session.get("conversation_history", [])
    next_question = generate_next_question(history)
    
    reply = f"[{evaluation['score'].upper()}] {evaluation['feedback']} {next_question}"
    session_service.update_session_history(session_id, "system", reply)
    
    return {
        "reply": reply,
        "done": False
    }