from fastapi import APIRouter, HTTPException
import traceback
from app.models.schemas import InterviewRequest, InterviewResponse
from app.services import session_service, interview_service

router = APIRouter()

@router.post("/api/interview", response_model=InterviewResponse)
async def handle_interview(request: InterviewRequest):
    try:
        session_id = request.sessionId

        # ---------------------------------------------------------
        # FLOW 1: START INTERVIEW
        # ---------------------------------------------------------
        if request.candidate:
            candidate_data = request.candidate.dict()
            result = interview_service.start_interview(session_id, candidate_data)
            return InterviewResponse(**result)

        # ---------------------------------------------------------
        # FLOW 2: CONTINUE / END INTERVIEW 
        # ---------------------------------------------------------
        elif request.message:
            session = session_service.get_session(session_id)
            if not session:
                raise HTTPException(
                    status_code=400, 
                    detail="Session not found. Please start the interview first."
                )
            
            session_service.update_session_history(session_id, "user", request.message)
            result = interview_service.continue_interview(session_id, request.message)
            
            return InterviewResponse(**result)

        else:
            raise HTTPException(status_code=400, detail="Invalid request payload.")

    except Exception as e:
        error_details = traceback.format_exc()
        print(error_details) # This safely prints to your terminal
        # Return a generic error to the frontend:
        raise HTTPException(status_code=500, detail="Internal Server Error. Please try again.")
    