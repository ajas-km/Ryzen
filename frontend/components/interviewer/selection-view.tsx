import { CheckCircle2, Search, Filter, MoreVertical, Calendar, FileText, Target, ChevronRight } from "lucide-react"
import { CANDIDATES, type Candidate } from "./data"

export function SelectionView({ onSelect }: { onSelect: (c: Candidate) => void }) {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
          <CheckCircle2 className="w-4 h-4" />
          Selection Phase
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Candidate for Assessment</h1>
        <p className="text-slate-500 max-w-2xl">
          Choose a candidate from your active pipeline or enter a unique Reference ID to initiate a specialized
          AI-conducted technical interview.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Filters & Input */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">Quick Selection</h3>
            <p className="text-sm text-slate-500 mb-4">Search by name or department</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Interview Type
                </label>
                <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Technical Assessment (L4)</option>
                </select>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="text-blue-500">#</span> Manual ID Input
            </h3>
            <p className="text-sm text-slate-500 mb-4">Directly target a candidate record via ID</p>

            <input
              type="text"
              placeholder="Enter Candidate ID (e.g. CAN-1234)"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-400 italic mb-4">Verify candidate details before proceeding.</p>
            <button className="w-full bg-blue-400 text-white rounded-lg py-2 text-sm font-medium opacity-70 cursor-not-allowed">
              Process ID &gt;
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-100 p-1.5 rounded text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Selection Insight</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Focusing on candidates with a <span className="font-semibold text-slate-900">Match Score above 85%</span>{" "}
              typically results in a 40% higher conversion rate during technical AI assessments.
            </p>
          </div>
        </div>

        {/* Right Column - Candidate Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Candidates (4)</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                <Filter className="w-4 h-4" /> Filter Pipeline
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4 text-sm text-slate-500">
            Sort by:{" "}
            <span className="font-medium text-slate-700 ml-1 flex items-center cursor-pointer">
              Match Score
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CANDIDATES.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-lg">
                        {candidate.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <Target className="w-3 h-3" /> {candidate.role}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5"># {candidate.id}</div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600" aria-label="More options">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Status</span>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Match Score</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      candidate.status === "Qualified"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {candidate.status}
                  </span>
                  <div className="flex items-center gap-2 w-1/2">
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${candidate.matchScore}%` }} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{candidate.matchScore}%</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {candidate.date}
                  </div>
                  <button
                    onClick={() => onSelect(candidate)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    Start Interview <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-sm font-medium text-slate-500 hover:text-slate-800">
              View All Pipeline Candidates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
