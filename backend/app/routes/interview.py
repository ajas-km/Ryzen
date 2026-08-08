from fastapi import APIRouter
from app.models.schemas import InterviewRequest, InterviewResponse

router = APIRouter()

@router.post("/api/interview", response_model=InterviewResponse)
async def handle_interview(request: InterviewRequest):
    """
    Step 1: Dummy endpoint. 
    Later, this will orchestrate session checking, AI evaluation, and question generation.
    """
    
    # Temporary static response to unblock the Frontend Developer
    return InterviewResponse(
        reply="Backend Dev 1 API is alive! Send me a message and I will echo it back soon.",
        done=False
    )