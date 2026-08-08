from fastapi import APIRouter, HTTPException
from app.models.schemas import InterviewRequest, InterviewResponse
from app.services import session_service, interview_service

router = APIRouter()

@router.post("/api/interview", response_model=InterviewResponse)
async def handle_interview(request: InterviewRequest):
    session_id = request.sessionId

    # ---------------------------------------------------------
    # FLOW 1: START INTERVIEW
    # ---------------------------------------------------------
    if request.candidate:
        candidate_data = request.candidate.dict()
        first_question = interview_service.start_interview(session_id, candidate_data)
        
        return InterviewResponse(
            reply=first_question,
            done=False
        )

    # ---------------------------------------------------------
    # FLOW 2: CONTINUE INTERVIEW (To be completed in Step 4)
    # ---------------------------------------------------------
    elif request.message:
        session = session_service.get_session(session_id)
        if not session:
            raise HTTPException(
                status_code=400, 
                detail="Session not found. Please start the interview first."
            )
        
        # Save candidate message to context history
        session_service.update_session_history(session_id, "user", request.message)
        
        return InterviewResponse(
            reply=f"[Step 4 Pending] Recorded message: '{request.message}'",
            done=False
        )

    else:
        raise HTTPException(
            status_code=400, 
            detail="Invalid request payload."
        )