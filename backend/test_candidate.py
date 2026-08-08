from app.services.candidate_service import get_candidate_by_id

candidate = get_candidate_by_id("CAND-001")

print(candidate)