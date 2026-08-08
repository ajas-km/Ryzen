from fastapi import APIRouter, HTTPException
from app.models.schemas import InterviewRequest, InterviewResponse
from app.services import session_service

router = APIRouter()

@router.post("/api/interview", response_model=InterviewResponse)
async def handle_interview(request: InterviewRequest):
    session_id = request.sessionId
    session = session_service.get_session(session_id)

    # ---------------------------------------------------------
    # FLOW 1: START INTERVIEW (Has candidate details)
    # ---------------------------------------------------------
    if request.candidate and request.candidate.member and request.candidate.member.id:
        candidate_id = request.candidate.member.id
        
        # Initialize the session in memory
        session = session_service.create_session(session_id, candidate_id)
        
        # MOCK: In Step 3, Dev 2's logic will generate the actual first question here.
        reply = f"[System: Session {session_id} started for Candidate {candidate_id}. Awaiting first question logic.]"
        
        # Store system output in history
        session_service.update_session_history(session_id, "system", reply)
        
        return InterviewResponse(reply=reply, done=False)

    # ---------------------------------------------------------
    # FLOW 2: CONTINUE INTERVIEW (Has a message)
    # ---------------------------------------------------------
    elif request.message:
        # Prevent continuing a non-existent session
        if not session:
            raise HTTPException(status_code=400, detail="Session not found. Please start the interview first.")
            
        # Store user input in history
        session_service.update_session_history(session_id, "user", request.message)
        
        # MOCK: In Step 4, Dev 2's logic will evaluate the answer and generate the next question here.
        reply = f"[System: Message received. Stored in history. Question count: {session['question_count']}]"
        
        # Store system output in history
        session_service.update_session_history(session_id, "system", reply)
        
        return InterviewResponse(reply=reply, done=False)

    # ---------------------------------------------------------
    # ERROR HANDLING
    # ---------------------------------------------------------
    else:
        raise HTTPException(
            status_code=400, 
            detail="Invalid request payload. Must provide 'candidate' to start, or 'message' to continue."
        )