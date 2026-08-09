# AI Usage Log (PROMPTS.md)
📌 Project: AI Interview Agent System

This document records how AI tools (ChatGPT / Gemini / Antigravity) were used during the design and development of an AI-powered interview system.

🔹 1. System Architecture Design

Prompt:
"Design a scalable AI-powered interview system with backend, frontend, and AI services separation."

AI Response Summary:
- Defined 3-role architecture:
  - Backend Dev 1 → API + session control
  - Backend Dev 2 → AI intelligence (this module)
  - Frontend Dev → UI + API integration
- Introduced single endpoint: `POST /api/interview`
- Defined modular services: `candidate_service`, `question_service`, `evaluation_service`, `feedback_service`

📂 Full conversation: /promts/dev2day1.txt

🔹 2. Candidate Data Processing

Prompt:
"Create a Python service to fetch candidate data and analyze performance topics."

AI Response Summary:
- Implemented: `get_candidate_by_id()`, `analyze_candidate()`
- Classified: weak topics, strong topics, skipped topics
- Used JSON-based dataset (no database)

📂 Full conversation: /promts/dev2day1.txt

🔹 3. Question Generation (LLM Integration)

Prompt:
"Generate interview questions dynamically using Gemini API based on candidate analysis."

AI Response Summary:
- Integrated Gemini 3.5 Flash Lite
- Built `generate_question()` function
- Created structured prompt: role-based, topic-based, difficulty-based
- Ensured no answers in output and realistic interview tone

📂 Full conversation: /promts/dev2day1.txt

🔹 4. Curriculum-Aware Questioning

Prompt:
"How to ensure AI-generated questions follow a defined syllabus (curriculum.json)?"

AI Response Summary:
- Introduced `curriculum_service.py`
- Extracted topic objectives and injected into prompt
- Result: Questions aligned with academic syllabus, reduced random AI outputs

📂 Full conversation: /promts/dev2day1.txt

🔹 5. Adaptive Questioning System (Core Intelligence)

Prompt:
"How to generate follow-up questions based on user answers and performance?"

AI Response Summary:
- Designed adaptive logic system:
  - Good → Harder question (same topic)
  - Average → Same level
  - Poor → Retry or easier
- Added support for previous context tracking

📂 Full conversation: /promts/dev2day1.txt

🔹 6. Smart Topic Switching Strategy

Prompt:
"How to avoid repeating topics and maintain structured topic progression?"

AI Response Summary:
- Implemented priority-based topic selection (skipped → weak → strong)
- Created `get_next_topic()`
- Avoids repetition, max 2 questions per topic, fallback logic included

📂 Full conversation: /promts/dev2day1.txt

🔹 7. Answer Evaluation using AI

Prompt:
"Evaluate candidate answers as good, average, or poor using LLM."

AI Response Summary:
- Built `evaluation_service.py`
- Used Gemini to classify answers using strict JSON prompting
- Solved parsing issues by enforcing valid JSON output

📂 Full conversation: /promts/dev2day1.txt

🔹 8. Handling Invalid / Nonsense Answers (Retry Logic)

Prompt:
"What should the system do if user gives meaningless answers?"

AI Response Summary:
- Introduced retry mechanism
- Poor (1st time) → Ask clarification
- Poor (2nd time) → Switch topic
- Achieved human-like interviewer behavior

📂 Full conversation: /promts/dev2day1.txt

🔹 9. Feedback Generation (Final AI Output)

Prompt:
"Generate structured interview feedback from Q&A history."

AI Response Summary:
- Built `feedback_service.py`
- Used LLM to analyze performance trends and knowledge gaps
- Output JSON with summary, strengths, gaps, and next steps

📂 Full conversation: /promts/dev2day1.txt

🔹 10. Debugging & Error Handling

Prompt:
"Fix Python errors like unexpected keyword arguments and JSON parsing issues."

AI Response Summary:
- Fixed function signature mismatch and indentation errors
- Fixed Markdown/JSON parsing failures
- Introduced fallback mechanisms

📂 Full conversation: /promts/dev2day1.txt

🔹 11. System Behavior Improvements

Prompt:
"Make the AI interviewer behave more like a real human interviewer."

AI Response Summary:
- Added follow-up questioning, retry logic, and topic continuity
- Removed random topic jumps
- Achieved structured interview flow

📂 Full conversation: /promts/dev2day1.txt

🔹 12. Smart Interview Termination & Clarification Limits

Prompt:
"Make interview length dynamic (8-12 questions). Treat 'I don't know' as poor. Restrict clarifications to max 3 times."

AI Response Summary:
- Implemented smart bounds checking (minimum 8, hard maximum 12 questions).
- Added logic to end early if the candidate struggles (`poor > good`), or continue to explore if performing well.
- Added a session tracking variable `clarification_count`.
- Rephrases the question seamlessly up to 3 times, after which the AI automatically transitions the topic.

📂 Full conversation: /promts/dev2day2.txt

🔹 13. Robust Response Handling & JSON Parsing Fixes

Prompt:
"Ensure the LLM accurately detects 'clarify' and 'dont_know' intents, and ignores random keyboard smashes."

AI Response Summary:
- Added explicitly mapped intents (`clarify`, `dont_know`, `invalid`) to the evaluation prompt.
- Fixed a silent failure where LLM markdown blocks (e.g. ```json) were crashing Python's `json.loads`.
- Prevented the AI from adding double conversational preambles (e.g. "Let me rephrase that") by instructing it strictly in the prompt.
- Fixed a bug where clarification prompts replaced the actual technical question in memory.

📂 Full conversation: /promts/dev2day2.txt

🔹 14. UI Data Integration & Progress Tracking

Prompt:
"Connect frontend and backend. Make the progress bar real and enable the PDF download button."

AI Response Summary:
- Modified the API response schema to include `questionCount` and `totalQuestions`.
- Wired the frontend UI progress bar to the dynamic values.
- Enabled native browser navigation (back/forward history tracking) between views.
- Wired the report view `Download` button to trigger a print-to-PDF output, injecting `@media print` CSS for a clean, professional output.

📂 Full conversation: /promts/dev2day2.txt


🧠 AI Tools Used
- ChatGPT (system design, debugging, logic)
- Google Gemini API (question generation, evaluation, feedback)
- Antigravity / Deepmind IDE (backend intelligence enhancements, bug fixes, UI integration)

🎯 Final Outcome
The system evolved from:
Static Q&A generator ❌
to:
Adaptive AI Interview Engine ✅

🚀 Key Features Achieved
- Candidate-aware questioning
- Curriculum-based questions
- Adaptive difficulty & Smart topic switching
- Dynamic interview length (8-12 questions)
- Answer evaluation (AI) with nonsense/clarification detection
- Real-time frontend progress & PDF export
- Final structured feedback

📂 Note
All raw AI conversations are stored locally in the `/promts/` directory (grouped by day, e.g., `dev2day1.txt`, `dev2day2.txt`) for transparency and evaluation.
