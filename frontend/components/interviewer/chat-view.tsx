import { useEffect, useRef, useState, useCallback } from "react"
import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  FileText,
  Calendar,
  PanelLeftClose,
  PanelLeftOpen,
  Send,
} from "lucide-react"
import type { Candidate, ChatMessage, BackendCandidate } from "./data"
import type { FeedbackData } from "./interviewer-app"

const API_BASE_URL = "http://localhost:8000"

export function ChatView({
  candidate,
  sessionId,
  backendCandidate,
  onInterviewComplete,
  onViewReport,
}: {
  candidate: Candidate
  sessionId: string
  backendCandidate: BackendCandidate
  onInterviewComplete: (feedback: FeedbackData) => void
  onViewReport: () => void
}) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isPreparing, setIsPreparing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(12)
  const [error, setError] = useState<string | null>(null)
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  // Real progress from API data
  const progress = isComplete ? 100 : totalQuestions > 0 ? Math.round((questionCount / totalQuestions) * 100) : 0

  useEffect(() => {
    chatHistoryRef.current?.scrollTo({
      top: chatHistoryRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, isPreparing])

  // Start interview on mount
  const startInterview = useCallback(async () => {
    if (hasStarted.current) return
    hasStarted.current = true
    setIsPreparing(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          candidate: backendCandidate,
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error: ${response.status}`)
      }

      const data = await response.json()
      const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())

      if (data.totalQuestions) setTotalQuestions(data.totalQuestions)
      if (data.questionCount != null) setQuestionCount(data.questionCount)

      setMessages([{
        id: Date.now(),
        sender: "ai",
        time,
        text: data.reply,
      }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start interview")
    } finally {
      setIsPreparing(false)
    }
  }, [sessionId, backendCandidate])

  useEffect(() => {
    startInterview()
  }, [startInterview])

  const handleSendMessage = async () => {
    const text = messageText.trim()
    if (!text || isPreparing || isComplete) return

    const messageId = Date.now()
    const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())

    // Add user message immediately
    setMessages((prev) => [...prev, { id: messageId, sender: "user", time, text }])
    setMessageText("")
    setIsPreparing(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: text,
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error: ${response.status}`)
      }

      const data = await response.json()
      const aiTime = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date())

      setMessages((prev) => [
        ...prev,
        {
          id: messageId + 1,
          sender: "ai",
          time: aiTime,
          text: data.reply,
        },
      ])
      if (data.totalQuestions) setTotalQuestions(data.totalQuestions)
      if (data.questionCount != null) setQuestionCount(data.questionCount)

      // Check if interview is done
      if (data.done && data.feedback) {
        setIsComplete(true)
        onInterviewComplete(data.feedback)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsPreparing(false)
    }
  }

  return (
    <div className="flex-1 min-h-0 flex overflow-hidden bg-[#09090b] animate-in fade-in duration-300 relative">
      {/* Same radial glow as homepage */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Left Sidebar — sticky */}
      {!isSidebarHidden && (
      <div className="w-72 h-full bg-zinc-950/80 backdrop-blur-md border-r border-zinc-800 flex flex-col overflow-y-auto overscroll-contain z-10 shrink-0">
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            <AlertCircle className="w-4 h-4" /> Active Session
          </div>

          <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
            <div className="text-xs text-zinc-500 mb-1">Candidate</div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-200 font-bold text-xs">
                {candidate.name.charAt(0)}
              </div>
              <span className="font-bold text-zinc-100">{candidate.name}</span>
            </div>

            <div className="text-xs text-zinc-500 mb-1">Position</div>
            <div className="font-medium text-sm text-zinc-300 mb-4">{candidate.role}</div>

            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-500">Session Progress</span>
              <span className="font-bold text-zinc-200">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4" /> Evaluation Flow
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Introduction
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Experience Review
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-zinc-100">
              <div className="w-5 h-5 rounded-full bg-zinc-400 text-zinc-900 flex items-center justify-center text-xs">
                3
              </div>
              Technical Competency
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center text-xs border border-zinc-700">
                4
              </div>
              Problem Solving
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center text-xs border border-zinc-700">
                5
              </div>
              Culture Fit
            </div>
          </div>
        </div>

        <div className="p-5 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" /> Quick Resources
          </div>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 p-2 rounded-md transition-colors text-left">
              <FileText className="w-4 h-4 text-zinc-500" /> Job Description.pdf
            </button>
            <button className="w-full flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 p-2 rounded-md transition-colors text-left">
              <FileText className="w-4 h-4 text-zinc-500" /> Assessment Rubric.v2
            </button>
            <button className="w-full flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 p-2 rounded-md transition-colors text-left">
              <Calendar className="w-4 h-4 text-zinc-500" /> Past Interview Notes
            </button>
          </div>
        </div>

        <div className="p-4 m-4 bg-zinc-900/60 rounded-xl border border-zinc-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-zinc-200 mb-1">Recruiter Tip</div>
              <div className="text-xs text-zinc-500 leading-relaxed">
                AI is focusing on &quot;Scaling Complexity&quot;. Feel free to nudge if details are thin.
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col relative z-10">
        <button
          type="button"
          onClick={() => setIsSidebarHidden((hidden) => !hidden)}
          className="absolute top-4 left-4 z-30 p-2 rounded-lg bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          aria-label={isSidebarHidden ? "Show menu" : "Hide menu"}
          title={isSidebarHidden ? "Show menu" : "Hide menu"}
        >
          {isSidebarHidden ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
        {/* Chat History */}
        <div
          ref={chatHistoryRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-pb-64 p-6 pb-64 md:scroll-pb-72 md:p-10 md:pb-72"
        >
          <div className="max-w-3xl mx-auto">
            {/* Session Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center relative shadow-lg">
                <MessageSquare className="w-8 h-8 text-zinc-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Technical Interview Session</h2>
            </div>

            <div className="border-t border-zinc-800 mb-8" />

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <AlertCircle className="w-4 h-4" /> Connection Error
                </div>
                {error}
              </div>
            )}

            {/* Messages */}
            <div className="space-y-8">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0 mt-1">
                    {msg.sender === "ai" ? (
                      <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-zinc-400" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-200 font-bold text-xs">
                        {candidate.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col`}
                  >
                    <div
                      className={`flex items-center gap-2 mb-1.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-xs font-bold text-zinc-300">
                        {msg.sender === "ai" ? "AI Interviewer" : candidate.name}
                      </span>
                      <span className="text-xs text-zinc-600">{msg.time}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-zinc-800 text-zinc-100 rounded-tr-sm border border-zinc-700"
                          : "bg-zinc-900/70 border border-zinc-800 text-zinc-300 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}

                      {msg.attachment && (
                        <div className="mt-3 bg-zinc-800/80 rounded-lg p-3 flex items-center gap-3 border border-zinc-700">
                          <FileText className="w-5 h-5 text-zinc-400" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-zinc-200">{msg.attachment}</div>
                            <div className="text-xs text-zinc-500">1.2 MB</div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isPreparing && (
                <div className="flex gap-4" role="status">
                  <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="bg-zinc-900/70 border border-zinc-800 text-zinc-400 rounded-2xl rounded-tl-sm px-4 py-3 text-sm animate-pulse">
                    {isComplete ? "Your interview report is preparing..." : "Your question is preparing..."}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 pt-16 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent">
          <div className="max-w-3xl mx-auto">
            {isComplete ? (
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/90 p-5 text-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <p className="font-semibold text-zinc-100">Interview complete</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Your report and feedback are ready to review.
                </p>
                <button
                  type="button"
                  onClick={onViewReport}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                >
                  View report &amp; feedback
                </button>
              </div>
            ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSendMessage()
              }}
              className="bg-zinc-900/60 border border-zinc-700 rounded-xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-zinc-600 focus-within:border-zinc-600 transition-all"
            >
              <textarea
                placeholder="Type your detailed response here..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-3 text-sm text-zinc-200 min-h-[80px] placeholder:text-zinc-600 focus:outline-none"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={!messageText.trim() || isPreparing}
                    className="bg-zinc-100 hover:bg-white disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    Send Response <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
            )}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Session Secured
              </span>
              <span className="text-zinc-700">|</span>
              <span>Standardized Protocol V4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
