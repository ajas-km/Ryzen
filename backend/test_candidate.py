from app.services.candidate_service import get_candidate_by_id, analyze_candidate
from app.services.question_service import generate_question
from app.services.evaluation_service import evaluate_answer


candidate = get_candidate_by_id("CAND-001")

analysis = analyze_candidate(candidate)

role = candidate.get("member", {}).get("jobRole", "Software Developer")

# FIRST QUESTION
q1 = generate_question(analysis, role)
print("Q1:", q1)

# FAKE ANSWER
answer = "Kafka ensures durability using replication."

eval_result = evaluate_answer(q1["question"], answer)
print("Evaluation:", eval_result)

# SECOND QUESTION (FOLLOW-UP)
q2 = generate_question(
    analysis,
    role,
    previous_question=q1["question"],
    evaluation=eval_result["rating"],
    current_topic=q1["topic"],
    topics_covered=[q1["topic"]],
    topic_question_count={q1["topic"]: 1}
)

print("Q2:", q2)
