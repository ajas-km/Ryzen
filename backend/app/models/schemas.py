from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class CandidateMember(BaseModel):
    id: str

class CandidateDetail(BaseModel):
    member: CandidateMember

class InterviewRequest(BaseModel):
    sessionId: str
    candidate: Optional[CandidateDetail] = None
    message: Optional[str] = None

class FeedbackFeedback(BaseModel):
    summary: str
    strengths: List[str]
    gaps: List[str]
    next: List[str]

class InterviewResponse(BaseModel):
    reply: str
    done: bool
    feedback: Optional[FeedbackFeedback] = None