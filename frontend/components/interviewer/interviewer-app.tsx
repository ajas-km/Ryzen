"use client"

import { useState } from "react"
import { AlertCircle, FileText, MessageSquare, CheckCircle2 } from "lucide-react"
import { Header } from "./header"
import { LandingView } from "./landing-view"
import { SelectionView } from "./selection-view"
import { ChatView } from "./chat-view"
import type { Candidate, ViewState } from "./data"

export function InterviewerApp() {
  const [currentView, setCurrentView] = useState<ViewState>("landing")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setCurrentView("chat")
  }

  const handleEndSession = () => {
    setCurrentView("selection")
    setSelectedCandidate(null)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {currentView !== "landing" && <Header />}

      <main className="flex-1 flex flex-col relative w-full">
        {currentView === "landing" && <LandingView onStart={() => setCurrentView("selection")} />}

        {currentView === "selection" && <SelectionView onSelect={handleSelectCandidate} />}

        {currentView === "chat" && selectedCandidate && (
          <ChatView candidate={selectedCandidate} onEnd={handleEndSession} />
        )}
      </main>

      {currentView === "selection" && (
        <footer className="bg-white border-t border-slate-200 py-6 px-8 mt-auto w-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div>© 2026 AI Interviewer Pro. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Help Center
              </a>
              <a href="#" className="hover:text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> Contact Support
              </a>
              <a href="#" className="hover:text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Platform Status
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
