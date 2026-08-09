AI Usage Log (PROMPTS.md)
📌 Project: AI Interview Agent (Backend Controller)
This document records how AI tools were used during the backend development and orchestration of the interview API.

🔹 1. Core Routing & Initial Fixes
Prompt:
"Fix application startup crashing with IndentationError and AttributeError: module 'app.routes.interview' has no attribute 'router'"

AI Response Summary:

Identified missing router instantiation due to copy-paste errors.

Generated the complete interview.py FastAPI router code.

Structured the single POST /api/interview endpoint to handle both "Start Interview" and "Continue Interview" payload flows.



🔹 2. Debugging Internal Server Errors & Service Mocks
Prompt:
"Troubleshoot 500 Internal Server Error in Swagger UI and fix missing start_interview function."

AI Response Summary:

Implemented a temporary try...except block with traceback.format_exc() to expose internal server errors to the frontend for debugging.

Built the interview_service.py orchestration logic to connect session memory with Dev 2's AI module mocks (analyze_candidate, generate_question, etc.).



🔹 3. Session State & Interview Termination (Step 5)
Prompt:
"How to enforce an 8-14 question limit and generate final feedback to end the interview loop?"

AI Response Summary:

Updated session_service.py to generate and store a random target_questions limit (8-14) upon session creation.

Modified interview_service.py to track the question count, terminate the interview when the target is reached, and return the final feedback object with the "done": true flag.

Created feedback_service.py mock for Dev 2.



🔹 4. API Testing & State Management Fixes
Prompt:
"Fix Postman 'Invalid protocol: [http:' error and AttributeError for 'update_current_topic'."

AI Response Summary:

Corrected Markdown formatting issues in the Postman URL bar.

Provided clean JSON payloads for the 3-step testing sequence (Start, Answer, End).

Rebuilt the complete session_service.py file to include all necessary in-memory state tracking functions (history, topic, and count).



🔹 5. Security Audit & Version Control
Prompt:
"Verify security of .gitignore and .env setup, and fix git commit not picking up untracked files."

AI Response Summary:

Conducted a security audit confirming .env and .env.example configurations were safe and correctly ignored by the root .gitignore.

Diagnosed a Git directory issue and provided the cd .. navigation commands to successfully track and push the documentation files to the GitHub repository.

