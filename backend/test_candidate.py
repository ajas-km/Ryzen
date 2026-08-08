from app.services.candidate_service import get_candidate_by_id

candidate = get_candidate_by_id("CAND-001")

print(candidate)

from app.services.candidate_service import get_candidate_by_id, analyze_candidate

candidate = get_candidate_by_id("CAND-001")

analysis = analyze_candidate(candidate)

print(analysis)