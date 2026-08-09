import random
from app.services import session_service
from app.services.candidate_service import analyze_candidate
from app.services.question_service import generate_question
from app.services.evaluation_service import evaluate_answer
from app.services.feedback_service import generate_feedback


def _get_progress(session: dict) -> dict:
    """Returns questionCount and totalQuestions for the frontend progress bar."""
    return {
        "questionCount": session.get("question_count", 0),
        "totalQuestions": session.get("max_questions", 12),
    }


def start_interview(session_id: str, candidate_data: dict) -> dict:
    """Handles the initialization of an interview session."""
    # candidate_data now contains the FULL candidate object (with missions)
    analysis = analyze_candidate(candidate_data)
    role = candidate_data.get("member", {}).get("jobRole", "Software Developer")
    
    # Call generate_question with the correct signature
    result = generate_question(analysis, role)
    first_question = result["question"]
    topic = result["topic"]
    
    candidate_id = candidate_data.get("member", {}).get("id", "UNKNOWN")
    session_service.create_session(session_id, candidate_id, analysis, role)
    
    session_service.update_current_topic(session_id, topic)
    session_service.track_topic(session_id, topic)
    session_service.increment_question_count(session_id)
    session_service.update_session_history(session_id, "system", first_question)
    
    session = session_service.get_session(session_id)
    return {
        "reply": first_question,
        "done": False,
        **_get_progress(session),
    }

def continue_interview(session_id: str, message: str) -> dict:
    """Handles an ongoing interview turn and checks for termination."""
    session = session_service.get_session(session_id)
    
    clarify_replies = [
        "I didn't quite understand your response. Could you clarify your answer?",
        "That doesn't seem related to the question. Could you try explaining again?",
        "I'd like to hear a more specific answer. Can you elaborate on your response?",
    ]
    
    # Get the actual last question from conversation history, ignoring clarification prompts
    last_question = ""
    for msg in reversed(session.get("conversation_history", [])):
        if msg["role"] == "system" and msg["content"] not in clarify_replies:
            last_question = msg["content"]
            break
            
    # Clean the last question to remove any conversational preambles (e.g. "Sure, let me rephrase that. ")
    if "Sure, let me rephrase that. " in last_question:
        last_question = last_question.split("Sure, let me rephrase that. ")[-1]
    if "That's perfectly fine, let's dive into another topic. " in last_question:
        last_question = last_question.split("That's perfectly fine, let's dive into another topic. ")[-1]
    if "No problem, let's focus on another aspect. " in last_question:
        last_question = last_question.split("No problem, let's focus on another aspect. ")[-1]
        
    # 1. Evaluate answer
    evaluation = evaluate_answer(last_question, message)
    
    # If the answer is nonsense/gibberish, ask to clarify without counting it
    if evaluation.get("rating") == "invalid":
        reply = random.choice(clarify_replies)
        session_service.update_session_history(session_id, "system", reply)
        return {
            "reply": reply,
            "done": False,
            **_get_progress(session),
        }
        
    # If the candidate asks to clarify or explain the question
    clarify_limit_reached = False
    if evaluation.get("rating") == "clarify":
        clarify_count = session.get("clarification_count", 0)
        if clarify_count < 3:
            session_service.increment_clarification_count(session_id)
            from app.services.question_service import rephrase_question
            rephrased = rephrase_question(last_question)
            reply = f"Sure, let me rephrase that. {rephrased}"
            session_service.update_session_history(session_id, "system", reply)
            return {
                "reply": reply,
                "done": False,
                **_get_progress(session),
            }
        else:
            clarify_limit_reached = True
            
    # Determine rating logic for "don't know" answers (or max clarifications hit)
    is_dont_know = evaluation.get("rating") == "dont_know" or clarify_limit_reached
    eval_rating = "poor" if is_dont_know else evaluation.get("rating", "average")
    
    session_service.increment_question_count(session_id)
    
    # Track Q&A entry in the format feedback_service expects
    session_service.add_qa_entry(
        session_id, last_question, message, 
        eval_rating
    )
    
    # 2. Smart termination: min 8 questions, max 12, based on performance
    should_end = _should_end_interview(session)
    
    if should_end:
        # We are done! Generate feedback from structured Q&A log.
        qa_log = session.get("interview_qa_log", [])
        feedback = generate_feedback(qa_log)
        
        final_reply = "That concludes our technical interview today. Thank you for your time!"
        session_service.update_session_history(session_id, "system", final_reply)
        
        return {
            "reply": final_reply,
            "done": True,
            "feedback": feedback,
            **_get_progress(session),
        }
    
    # 3. Otherwise, continue with the next question
    result = generate_question(
        session["analysis"],
        session["role"],
        previous_question=last_question,
        evaluation=eval_rating,
        current_topic=session.get("current_topic"),
        topics_covered=session.get("topics_covered", []),
        topic_question_count=session.get("topic_question_count", {})
    )
    next_question = result["question"]
    new_topic = result["topic"]
    
    # Update session tracking
    old_topic = session.get("current_topic")
    session_service.update_current_topic(session_id, new_topic)
    session_service.track_topic(session_id, new_topic)
    
    reply = next_question
    if is_dont_know:
        if clarify_limit_reached:
            reply = f"Since we've clarified a few times already, let's move on. {next_question}"
        elif new_topic != old_topic:
            reply = f"That's perfectly fine, let's dive into another topic. {next_question}"
        else:
            reply = f"No problem, let's focus on another aspect. {next_question}"
    session_service.update_session_history(session_id, "system", reply)
    
    return {
        "reply": reply,
        "done": False,
        **_get_progress(session),
    }


def _should_end_interview(session: dict) -> bool:
    """
    Smart termination logic:
    - Below 8 questions: NEVER end
    - At 12 questions: ALWAYS end (hard max)
    - Between 8-12: check performance
        - Mostly poor (poor > good) → stop (candidate is struggling)
        - Mostly good (good > poor) → continue (explore deeper)
        - Mixed/even → stop at 10
    """
    count = session["question_count"]
    min_q = session.get("min_questions", 8)
    max_q = session.get("max_questions", 12)

    # Below minimum — always continue
    if count < min_q:
        return False

    # Hit maximum — always stop
    if count >= max_q:
        return True

    # Between min and max — decide based on performance
    qa_log = session.get("interview_qa_log", [])
    good_count = sum(1 for entry in qa_log if entry.get("evaluation") == "good")
    poor_count = sum(1 for entry in qa_log if entry.get("evaluation") == "poor")

    if poor_count > good_count:
        # Candidate is weak — no need to continue
        return True
    elif good_count > poor_count:
        # Candidate is strong — keep going to explore deeper
        return False
    else:
        # Mixed performance — stop at 10
        return count >= 10