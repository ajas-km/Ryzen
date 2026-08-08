def generate_feedback(history: list) -> dict:
    """Mock final feedback generation (Dev 2 will replace this with LLM logic)."""
    return {
        "summary": "The candidate demonstrated strong foundational knowledge but struggled with advanced deployment concepts.",
        "strengths": ["Clear communication", "Good understanding of vector databases"],
        "gaps": ["Could dive deeper into mathematical specifics"],
        "next": ["Review advanced indexing techniques", "Practice containerization"]
    }