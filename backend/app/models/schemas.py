from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class CandidateMember(BaseModel):
    id: str
    name: str = ""
    jobRole: str = ""
    yearsExperience: int = 0
    education: str = ""
    status: str = ""

class Mission(BaseModel):
    day: int = 0
    title: str = ""
    passed: Optional[bool] = None
    attempts: Optional[int] = None
    skipped: Optional[bool] = None

class Signals(BaseModel):
    commitDays: int = 0
    missionsCompleted: int = 0
    missionsFirstTry: int = 0

class CandidateDetail(BaseModel):
    member: CandidateMember
    missions: List[Mission] = []
    signals: Optional[Signals] = None

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
    questionCount: Optional[int] = None
    totalQuestions: Optional[int] = None
    evaluation: Optional[str] = None  # "good" | "average" | "poor" | None