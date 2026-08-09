"use client"

import { useState, useEffect, useCallback } from "react"
import { AlertCircle, FileText, MessageSquare, CheckCircle2 } from "lucide-react"
import { Header } from "./header"
import { LandingView } from "./landing-view"
import { SelectionView } from "./selection-view"
import { ChatView } from "./chat-view"
import { ReportView } from "./report-view"
import type { Candidate, ViewState, BackendCandidate } from "./data"
import { getBackendCandidate } from "./data"

export type FeedbackData = {
  summary: string
  strengths: string[]
  gaps: string[]
  next: string[]
}

export function InterviewerApp() {
  const [currentView, setCurrentView] = useState<ViewState>("landing")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [sessionId, setSessionId] = useState<string>("")
  const [backendCandidate, setBackendCandidate] = useState<BackendCandidate | null>(null)
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)

  // Navigate to a view and push browser history
  const navigateTo = useCallback((view: ViewState, pushHistory = true) => {
    setCurrentView(view)
    if (pushHistory) {
      window.history.pushState({ view }, "", `#${view}`)
    }
  }, [])

  // Handle browser back/forward buttons
  useEffect(() => {
    // Set initial history state
    window.history.replaceState({ view: "landing" }, "", "#landing")

    const handlePopState = (event: PopStateEvent) => {
      const view = event.state?.view as ViewState | undefined
      if (view) {
        // If going back from chat/summary, reset session state
        if ((view === "landing" || view === "selection") && (currentView === "chat" || currentView === "summary")) {
          setSelectedCandidate(null)
          setBackendCandidate(null)
          setSessionId("")
          setFeedback(null)
        }
        setCurrentView(view)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [currentView])

  const handleSelectCandidate = (candidate: Candidate) => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    setSessionId(newSessionId)
    setSelectedCandidate(candidate)
    const fullCandidate = getBackendCandidate(candidate.id)
    setBackendCandidate(fullCandidate || null)
    setFeedback(null)
    navigateTo("chat")
  }

  const handleInterviewComplete = (feedbackData: FeedbackData) => {
    setFeedback(feedbackData)
  }

  const handleEndSession = () => {
    setSelectedCandidate(null)
    setBackendCandidate(null)
    setSessionId("")
    setFeedback(null)
    navigateTo("selection")
  }

  return (
    <div
      className={`bg-[#09090b] flex flex-col font-sans text-zinc-200 ${
        currentView === "chat" ? "h-dvh min-h-0 overflow-hidden" : "min-h-screen"
      }`}
    >
      {currentView === "selection" && <Header />}

      <main className="flex-1 min-h-0 flex flex-col relative w-full">
        {currentView === "landing" && <LandingView onStart={() => navigateTo("selection")} />}

        {currentView === "selection" && <SelectionView onSelect={handleSelectCandidate} />}

        {currentView === "chat" && selectedCandidate && backendCandidate && (
          <ChatView
            candidate={selectedCandidate}
            sessionId={sessionId}
            backendCandidate={backendCandidate}
            onInterviewComplete={handleInterviewComplete}
            onViewReport={() => navigateTo("summary")}
          />
        )}

        {currentView === "summary" && selectedCandidate && (
          <ReportView candidate={selectedCandidate} feedback={feedback} onBack={handleEndSession} />
        )}
      </main>

      {currentView === "selection" && (
        <footer className="bg-[#09090b] border-t border-zinc-800 py-6 px-8 mt-auto w-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <div>© 2026 AI interPro. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Help Center
              </a>
              <a href="#" className="hover:text-zinc-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Privacy Policy
              </a>
              <a href="#" className="hover:text-zinc-300 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> Contact Support
              </a>
              <a href="#" className="hover:text-zinc-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Platform Status
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
