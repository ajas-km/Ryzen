import {
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  FileText,
  Calendar,
  Maximize2,
  MoreVertical,
  ChevronRight,
  Paperclip,
  Mic,
  Send,
} from "lucide-react"
import { CHAT_MESSAGES, type Candidate } from "./data"

export function ChatView({ candidate, onEnd }: { candidate: Candidate; onEnd: () => void }) {
  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50 animate-in fade-in duration-300">
      {/* Left Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            <AlertCircle className="w-4 h-4" /> Active Session
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="text-xs text-slate-500 mb-1">Candidate</div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {candidate.name.charAt(0)}
              </div>
              <span className="font-bold text-slate-900">{candidate.name}</span>
            </div>

            <div className="text-xs text-slate-500 mb-1">Position</div>
            <div className="font-medium text-sm text-slate-800 mb-4">{candidate.role}</div>

            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500">Session Progress</span>
              <span className="font-bold text-blue-600">35%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[35%]" />
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4" /> Evaluation Flow
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Introduction
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Experience Review
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                3
              </div>
              Technical Competency
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">
                4
              </div>
              Problem Solving
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs">
                5
              </div>
              Culture Fit
            </div>
          </div>
        </div>

        <div className="p-5 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" /> Quick Resources
          </div>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md transition-colors text-left">
              <FileText className="w-4 h-4 text-slate-400" /> Job Description.pdf
            </button>
            <button className="w-full flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md transition-colors text-left">
              <FileText className="w-4 h-4 text-slate-400" /> Assessment Rubric.v2
            </button>
            <button className="w-full flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-md transition-colors text-left">
              <Calendar className="w-4 h-4 text-slate-400" /> Past Interview Notes
            </button>
          </div>
        </div>

        <div className="p-4 m-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 mb-1">Recruiter Tip</div>
              <div className="text-xs text-slate-600 leading-relaxed">
                AI is focusing on &quot;Scaling Complexity&quot;. Feel free to nudge if details are thin.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        {/* Top Bar */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live Interview
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="text-sm font-bold text-slate-900">Technical Competency</div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <div className="text-sm text-slate-500">Priority Management</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-slate-600" aria-label="Maximize">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-slate-600" aria-label="More options">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button
              onClick={onEnd}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-1.5 rounded-md transition-colors border border-red-200"
            >
              End Session
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            {/* Session Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center relative border-4 border-white shadow-sm">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Technical Interview Session</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                This session is being recorded and transcribed in real-time for assessment purposes. All data is
                processed securely.
              </p>

              <div className="flex items-center justify-center gap-8 mt-6 text-xs">
                <div className="text-center">
                  <div className="text-slate-400 mb-1">Reliability</div>
                  <div className="font-bold text-green-600">99.8%</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 mb-1">Latency</div>
                  <div className="font-bold text-blue-600">120ms</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 mb-1">Security</div>
                  <div className="font-bold text-blue-600">AES-256</div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 mb-8" />

            {/* Messages */}
            <div className="space-y-8">
              {CHAT_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0 mt-1">
                    {msg.sender === "ai" ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white font-bold text-xs">
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
                      <span className="text-xs font-bold text-slate-700">
                        {msg.sender === "ai" ? "AI Interviewer" : candidate.name}
                      </span>
                      <span className="text-xs text-slate-400">{msg.time}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}

                      {msg.attachment && (
                        <div className="mt-3 bg-blue-700/50 rounded-lg p-3 flex items-center gap-3 border border-blue-500/30">
                          <FileText className="w-5 h-5 text-blue-200" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{msg.attachment}</div>
                            <div className="text-xs text-blue-200">1.2 MB</div>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <textarea
                placeholder="Type your detailed response here..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-3 text-sm text-slate-800 min-h-[80px]"
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-2">
                  <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 flex items-center gap-1.5 text-xs font-medium transition-colors">
                    <Paperclip className="w-4 h-4" /> Attach
                  </button>
                  <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200 flex items-center gap-1.5 text-xs font-medium transition-colors">
                    <Mic className="w-4 h-4" /> Voice
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden sm:inline-block">Press Enter to send</span>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-500 transition-colors">
                    Send Response <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Session Secured
              </span>
              <span className="text-slate-300">|</span>
              <span>Standardized Protocol V4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
