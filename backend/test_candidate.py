from app.services.candidate_service import get_candidate_by_id, analyze_candidate
from app.services.question_service import generate_question

candidate = get_candidate_by_id("CAND-001")

print("Candidate:", candidate)

analysis = analyze_candidate(candidate)

print("Analysis:", analysis)

# 🔥 Extract role dynamically
role = candidate.get("member", {}).get("jobRole", "Software Developer")

question = generate_question(analysis, role=role)

print("Role:", role)
print("Question:", question)
