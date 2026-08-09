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

**Prompt → AI response/action → implementation → verification → outcome**

That makes it easier for judges to understand that the AI tools were used throughout the actual development process.

Below is the **final version you can paste into Notion**.

---

# 🤖 AI Usage Log — Frontend Development

## 📌 AI Interview Agent

### ABTalks AI Cohort Hackathon

This document records the use of AI-assisted development tools during the development of the **AI Interview Agent** frontend.

The log documents significant AI-assisted development activities, including UI generation, design exploration, frontend implementation, navigation improvements, interaction development, debugging, and UX refinement.

The purpose of this documentation is to provide a transparent development trail showing how AI tools contributed to the project and how their outputs were integrated, modified, tested, and refined by the development team.

---

# 📋 Development Overview

| Item                     | Details                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| **Project**              | AI Interview Agent                                               |
| **Development Area**     | Frontend                                                         |
| **Hackathon**            | ABTalks AI Cohort Hackathon                                      |
| **Primary Objective**    | Build a professional conversational AI interview experience      |
| **AI Tools Used**        | Magic Patterns, v0, Antigravity, Codex                           |
| **Core Views**           | Landing, Profile Selection, Interview Session, Assessment Report |
| **Development Sessions** | 5                                                                |
| **Final User Journey**   | Landing → Profile Selection → Interview → Completion → Feedback  |

---

# 🔹 1. Initial Screen Setup

**AI Tool:** Magic Patterns
**Development Phase:** Frontend UI / Prototype Setup
**Session:** Frontend Development — Session 1

### 🎯 Objective

Establish the initial screen structure and application states for the AI Interview Agent prototype.

### 💬 Prompt / Instruction

> **Set up Screens**

### 🤖 AI Response / Action

Magic Patterns created the initial prototype screen structure for the AI Interviewer Pro application.

Two primary screens were configured:

- Candidate Selection Dashboard
- Active Interview Session / Chat View

The screens were wired to represent their respective application states and provide the foundation for transitioning between candidate selection and the active interview experience.

### 🛠️ Implementation

The initial screen architecture was established as the foundation for the frontend prototype.

### ✅ Verification

The configured screens were reviewed within the Magic Patterns prototype environment.

### 📌 Outcome

The project obtained its initial frontend screen structure, establishing the foundation for subsequent UI and interaction development.

**AI Tool:** Magic Patterns
**Conversation:** Frontend Development — Session 1

---

# 🔹 2. Landing Page Design Exploration

**AI Tool:** Magic Patterns
**Development Phase:** UI/UX Exploration
**Session:** Frontend Development — Session 1

### 🎯 Objective

Explore multiple visual directions for the landing page before implementing the final design.

### 💬 Prompt / Instruction

> **/Inspiration — Explore other variations of this design**

### 🤖 AI Response / Action

Magic Patterns generated four different landing-page design concepts:

1. **Floating UI Hero**
2. **Split Layout Mockup**
3. **Dark Mode Tech**
4. **Minimalist Typography**

These concepts provided alternative visual approaches for the application's landing experience.

### 🧠 Team Decision

After reviewing the generated concepts, the team selected:

> **Dark Mode Tech**

as the preferred visual direction.

### 📌 Outcome

A clear visual direction was established before implementation, allowing the team to proceed with a consistent design language.

**AI Tool:** Magic Patterns
**Conversation:** Frontend Development — Session 1

---

# 🔹 3. Landing Page Implementation

**AI Tool:** Magic Patterns
**Development Phase:** Frontend Implementation
**Session:** Frontend Development — Session 1

### 🎯 Objective

Implement the selected **Dark Mode Tech** concept as the application's landing page.

### 💬 Prompt / Instruction

> **Implement the "Dark Mode Tech" concept.**

### 🤖 AI Response / Action

Magic Patterns implemented the selected design as the application's landing page.

The generated `LandingView` included:

- Dark visual theme
- Neon blue accent elements
- Animated glowing logo
- Primary CTA buttons
- Floating decorative UI cards
- Subtle grid background
- Landing-page hero section

The Screens view was also updated to include the new landing page.

The CTA buttons were connected to the application flow, allowing users to move from the landing page to the Candidate Selection Dashboard.

### 🛠️ Implementation Result

The initial application flow became:

```text
Landing Page
      ↓
Candidate Selection
      ↓
Active Interview Session
```

### ✅ Verification

The landing page and navigation flow were reviewed in the prototype environment.

### 📌 Outcome

The project moved from a basic multi-screen prototype to a connected application flow with a dedicated landing experience.

**AI Tool:** Magic Patterns
**Conversation:** Frontend Development — Session 1

---

# 🔹 4. Frontend Prototype Verification

**AI Tool:** Magic Patterns
**Development Phase:** Verification / Iteration
**Session:** Frontend Development — Session 1

### 🎯 Objective

Verify the initial frontend screens and their transitions before continuing development.

### 🔍 Verified Components

- Landing Page
- Candidate Selection screen
- Active Interview Chat screen
- Screen transitions
- CTA navigation
- Overall visual consistency

### 🤖 AI-Assisted Result

The generated screens and interactions were reviewed within the Magic Patterns prototype environment.

### 📌 Outcome

The initial frontend prototype was successfully established and provided the visual and structural foundation for subsequent development.

---

# 🔹 5. Continued Frontend Development in v0

**AI Tool:** v0
**Development Phase:** Frontend Refinement / Navigation
**Session:** Frontend Development — Session 2

### 📌 Development Context

After reaching the daily usage limit of Magic Patterns, frontend development was continued using **v0**.

The existing project files and UI structure were carried forward into v0 so that development could continue from the established prototype rather than rebuilding the frontend from the beginning.

### 🎯 Objective

Improve navigation within the candidate-selection experience by providing a way to return to the landing page.

### 💬 Prompt / Instruction

> **I'll add an `onBack` prop to SelectionView and render a back button, then wire it up in the app shell.**

### 🤖 AI Response / Action

v0 modified the existing candidate-selection interface.

The implementation included:

- Added an `onBack` prop to `SelectionView`
- Added a **Back to Home** button
- Added an `ArrowLeft` icon
- Wired the `onBack` callback through the application shell
- Updated application state to switch the view back to `"landing"`

### 🔄 Implementation Flow

```text
SelectionView
      ↓
Back to Home Button
      ↓
onBack()
      ↓
Application Shell
      ↓
view = "landing"
      ↓
Landing Page
```

### ✅ Verification

v0 verified the implementation in the browser.

- Back button rendered correctly
- `ArrowLeft` icon displayed correctly
- `onBack` prop connected
- Application shell updated
- Browser interaction tested
- Navigation to landing page verified

### 📌 Outcome

The candidate-selection screen gained functional navigation back to the application's landing page.

**AI Tool:** v0
**Conversation:** Frontend Development — Session 2

---

# 🔹 6. Advanced Theming & Layout Polish in Antigravity

**AI Tool:** Antigravity IDE — Gemini / Claude Models
**Development Phase:** Global Theming, Layout Refinement & Component Polishing
**Session:** Frontend Development — Session 3

### 📌 Development Context

Following the baseline functionality established in the initial prototype and v0, development was continued in **Antigravity**.

The objective was to improve the overall visual quality and user experience while maintaining the existing application content and functionality.

---

## 🎯 6.1 Landing Page Visual Refinement

### 💬 Prompt

> "The total home page is feel like an AI vibecoded typical style.so without changing contents and other things.make it as better design and overall look."

### 🤖 AI-Assisted Work

The landing page was refined to achieve a more polished AI-product aesthetic while preserving the existing content and application purpose.

### 📌 Outcome

The landing experience was visually upgraded to provide a more cohesive and premium first impression.

---

## 🎯 6.2 Profile Selection UX Overhaul

### 💬 Prompt

> "replace the main heading 'Select Candidate for Assessment' and associate contents and place heading that 'Select your profile'... remove Quick Selection box totally... below the heading place the search bar for entering the id manually... add total 6 cards in the profile selection page."

### 🤖 AI-Assisted Work

The candidate-selection experience was redesigned around a simpler profile-selection workflow.

The changes included:

- Replaced the previous selection heading
- Introduced **Select Your Profile**
- Removed the Quick Selection section
- Added an ID-entry/search interface
- Expanded the profile selection interface to six candidate cards

### 📌 Outcome

The profile-selection screen became more focused and aligned with the intended user journey.

---

## 🎯 6.3 Technical Interview Layout Refinement

### 💬 Prompt

> "remove the header from the 'Technical Interview Session' page... set total colour theme is same as home page... the menu bar should not be scrolled. it should be static. And the text box should be overplaced above the chat. the chat is only thing should be scrolled."

### 🤖 AI-Assisted Work

The active interview interface was refined to improve usability and consistency.

The changes focused on:

- Removing the unnecessary header
- Matching the interview page theme with the landing page
- Keeping the menu/navigation area static
- Keeping the response input area fixed
- Restricting scrolling primarily to the chat history

### 📌 Outcome

The interview screen became more focused on the conversation itself while maintaining consistent visual styling across the application.

**AI Tool:** Antigravity
**Conversation:** Frontend Development — Session 3

---

# 🔹 7. Interactive Interview Completion & Feedback Report

**AI Tool:** Codex
**Development Phase:** Interview Flow Enhancement / Report Experience
**Session:** Frontend Development — Session 4

### 🎯 Objective

Extend the prototype beyond the active interview screen and demonstrate a complete assessment lifecycle from candidate interaction to structured feedback.

### 💬 Prompt / Instruction Summary

> Enhance the interview session so candidates can submit responses, see interview progress, complete the session, and open a detailed feedback report.

### 🤖 AI Response / Action

Codex enhanced the interview interface with local interactive state and introduced a dedicated post-interview report screen.

### 🛠️ Interview Interaction Enhancements

The implementation included:

- Controlled response input
- Send-message behavior
- Simulated AI interviewer responses
- Automatic chat-history scrolling
- Dynamic session-progress tracking
- Interview completion handling
- Completion state at 100% progress
- **View Report & Feedback** CTA

The simulated progress started at 35% and increased as responses were submitted.

### 📊 Completion Flow

```text
Candidate Selection
        ↓
Active Interview Session
        ↓
Candidate submits response
        ↓
AI interviewer response
        ↓
Progress updates
        ↓
Progress reaches 100%
        ↓
Interview Complete
        ↓
View Report & Feedback
```

---

## 📄 Feedback Report Implementation

Codex created a dedicated `ReportView` component for post-interview assessment results.

The report included:

- Candidate-specific heading
- Role information
- Overall interview score
- Percentile
- Interview duration
- Hiring recommendation
- Technical Depth score
- Communication score
- Problem Solving score
- Culture Fit score
- Key strengths
- Areas for improvement
- AI-generated next-step recommendations
- Back-to-candidates navigation

### 🔄 Complete Assessment Flow

```text
Candidate Selection
        ↓
Active Interview Session
        ↓
Candidate Responses
        ↓
Interview Completion
        ↓
Assessment Report
        ↓
Feedback & Recommendations
        ↓
Back to Candidate Selection
```

### 📌 Outcome

The frontend evolved from a screen-based prototype into a demonstrable end-to-end interview assessment experience.

The prototype could now demonstrate:

> **Candidate selection → interview → completion → assessment → feedback**

**AI Tool:** Codex
**Conversation:** Frontend Development — Session 4

---

# 🔹 8. Chat Viewport Layout Correction

**AI Tool:** Codex
**Development Phase:** Layout Stability / UX Correction
**Session:** Frontend Development — Session 5

### 📌 Development Context

During testing of the active interview interface, a viewport-layout issue was identified.

The interview screen needed to remain constrained within the available application viewport while allowing the chat history to scroll independently.

### 🎯 Objective

Correct the viewport and scrolling behavior without changing the intended interview experience.

### 🤖 AI-Assisted Implementation

Codex updated the active chat container to use absolute viewport positioning.

The implementation included:

- Changed the active chat container to `absolute inset-0`
- Preserved the existing application height
- Preserved overflow boundaries
- Ensured the interview interface fills the available viewport
- Isolated scrolling to the intended chat-history region

### 📌 Outcome

The active interview layout became more stable.

The intended UX was achieved:

```text
┌─────────────────────────────────────┐
│ Fixed Navigation / Session Controls │
├─────────────────────────────────────┤
│                                     │
│          Scrollable Chat            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Fixed Response Input                │
└─────────────────────────────────────┘
```

Only the conversation history requires scrolling while the surrounding application interface remains stable.

**AI Tool:** Codex
**Conversation:** Frontend Development — Session 5

---

# 📊 Development Session Summary

| Session       | AI Tool        | Primary Focus         | Major Outcome                                         |
| ------------- | -------------- | --------------------- | ----------------------------------------------------- |
| **Session 1** | Magic Patterns | Initial UI & design   | Prototype screens and landing page                    |
| **Session 2** | v0             | Navigation refinement | Back-to-home interaction                              |
| **Session 3** | Antigravity    | UI/UX refinement      | Premium theme, profile selection and interview layout |
| **Session 4** | Codex          | Interview interaction | Interactive interview and feedback report             |
| **Session 5** | Codex          | UX correction         | Stable viewport and chat scrolling                    |

---

# 🧩 AI Tools & Their Role

| AI Tool            | Role in Development                                                                 |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Magic Patterns** | Initial prototyping, screen setup and visual exploration                            |
| **v0**             | Continued frontend development and navigation refinement                            |
| **Antigravity**    | Visual redesign, layout refinement and UX polishing                                 |
| **Codex**          | Interactive behavior, interview completion, report experience and layout correction |

---

# 🏗️ Core Frontend Components

The development resulted in four primary user-facing experiences:

### 1. Landing Page

Introduces the AI Interview Agent and directs the user into the interview workflow.

### 2. Profile Selection

Allows the user to select a candidate/profile and begin an assessment.

### 3. Active Interview Session

Provides the conversational interview experience with:

- AI questions
- Candidate responses
- Progress tracking
- Scrollable conversation
- Interview completion state

### 4. Assessment Report

Provides structured post-interview feedback including:

- Overall performance
- Competency scores
- Strengths
- Improvement areas
- Recommendations

---

# 🔄 Final User Journey

```text
                    LANDING PAGE
                         │
                         ▼
                 PROFILE SELECTION
                         │
                         ▼
                 INTERVIEW SESSION
                         │
                  Candidate Answers
                         │
                         ▼
                 AI Interviewer
                         │
                         ▼
                Progress Tracking
                         │
                         ▼
                 INTERVIEW COMPLETE
                         │
                         ▼
                 FEEDBACK REPORT
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Strengths & Gaps      Next Steps
              │                     │
              └──────────┬──────────┘
                         ▼
                BACK TO CANDIDATES
```

---

# 🔗 Overall Development Timeline

```text
┌──────────────────────────────────────┐
│ 1. Initial Screen Setup              │
│    Magic Patterns                    │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 2. Design Inspiration                │
│    4 concepts explored               │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 3. Dark Mode Tech Selected            │
│    LandingView implemented            │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 4. Prototype Verification            │
│    Screen flow tested                 │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 5. v0 Development                    │
│    Navigation refinement             │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 6. Antigravity                       │
│    Visual & UX refinement             │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 7. Codex                             │
│    Interactive interview + report    │
└──────────────────┬───────────────────┘
                   ↓
┌──────────────────────────────────────┐
│ 8. Codex                             │
│    Viewport & scrolling correction   │
└──────────────────┬───────────────────┘
                   ↓
             FINAL FRONTEND
```

---

# 🧠 Development Approach

The frontend was developed incrementally rather than being generated as one complete application.

The development process followed:

**Prototype → Explore → Implement → Verify → Refine → Integrate → Test → Polish**

AI-generated outputs were treated as development inputs rather than as a replacement for the team's development decisions. The team reviewed the generated implementations, selected suitable approaches, modified the resulting UI and behavior, and verified the application through browser testing.

The AI tools were also changed during development based on availability and project needs. When the Magic Patterns daily usage limit was reached, development continued in v0 using the existing project structure. Further refinement was then carried out using Antigravity and Codex.

---

# 📌 Important Documentation Note

This log summarizes the significant AI-assisted development activities used during the frontend development process.

Where available, the original AI conversations should be retained alongside this summary to provide traceable evidence of:

> **Prompt → AI Output → Implementation → Verification → Project Result**

The development history should be considered together with the project's Git commit history, which records the progression of the implementation throughout the hackathon.

---

# 👥 Team Contribution Context

AI tools were used as development assistants throughout the frontend implementation process.

The development team remained responsible for:

- Selecting appropriate AI-generated solutions
- Defining project requirements
- Reviewing generated code and designs
- Modifying implementations
- Integrating components
- Testing functionality
- Identifying UI/UX issues
- Making final engineering decisions

AI assistance therefore formed part of the development workflow while the final implementation and project decisions remained under the team's control.

---

# 🏁 Final Frontend Outcome

The frontend progressed from an initial prototype containing basic screens into a complete demonstrable assessment experience.

### Final experience:

**Landing Page**

↓

**Profile Selection**

↓

**Interactive Interview**

↓

**Interview Completion**

↓

**Assessment Report**

↓

**Strengths, Gaps & Recommendations**

The final frontend provides the visual and interactive foundation for demonstrating the AI Interview Agent as a conversational technical assessment platform.

---

## 🔗 Project Evidence

**GitHub Repository:**
`[Add GitHub repository link]`

**Live Demo:**
`[Add live demo URL]`

**Full AI Conversation Archive:**
`[Add Notion / conversation archive link]`

**Team:**
`[Member 1] · [Member 2] · [Member 3]`

---

### One thing I would do before submitting

Keep this **summary document as the main Notion page**, but don't delete the original conversations. Create a small **“Original AI Conversations & Evidence”** section underneath it and put the actual Magic Patterns, v0, Antigravity, and Codex conversation screenshots/exports there.

That gives you two layers:

**Layer 1 — Judge-friendly documentation**

> This page

**Layer 2 — Authenticity evidence**

> Original prompts + AI responses + screenshots + Git commits
