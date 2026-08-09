"use client"

import { useState, useMemo } from "react"
import { Search, Filter, MoreVertical, Calendar, Target, ChevronRight, X } from "lucide-react"
import { getCandidateDisplayList, type Candidate } from "./data"

const CANDIDATES = getCandidateDisplayList()


type FilterStatus = "All" | "Qualified" | "In Review" | "Screening"

export function SelectionView({ onSelect }: { onSelect: (c: Candidate) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const filteredCandidates = useMemo(() => {
    return CANDIDATES.filter((c) => {
      const matchesSearch =
        searchQuery === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = filterStatus === "All" || c.status === filterStatus

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filterStatus])

  const statusOptions: FilterStatus[] = ["All", "Qualified", "In Review", "Screening"]

  return (
    <div className="relative min-h-screen w-full">
      {/* Same radial glow as homepage */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 lg:p-12 animate-in fade-in duration-500 w-full">
      {/* Centered Heading */}
      <div className="mb-12 text-center flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">Select your profile</h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl">
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or ID..."
            className="w-full bg-zinc-900/60 border border-zinc-700 rounded-full pl-12 pr-10 py-3.5 text-sm md:text-base text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-500 shadow-sm backdrop-blur-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
          Recent Profiles
          {filterStatus !== "All" && (
            <span className="ml-2 text-zinc-400 normal-case font-medium">· {filterStatus}</span>
          )}
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
              filterStatus !== "All"
                ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>

          {/* Dropdown */}
          {showFilterDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status)
                    setShowFilterDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    filterStatus === status
                      ? "bg-zinc-800 text-zinc-100 font-medium"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                  }`}
                >
                  {status === "All" ? "All Statuses" : status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Candidates Grid - 3 columns */}
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">No profiles match your search.</p>
          <button
            onClick={() => {
              setSearchQuery("")
              setFilterStatus("All")
            }}
            className="mt-4 text-sm text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-400/20 rounded-xl p-5 hover:border-zinc-400/40 hover:bg-zinc-800/60 transition-all duration-300 flex flex-col shadow-[0_2px_20px_rgba(161,161,170,0.06)] group/card"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-11 h-11 bg-zinc-800 border border-zinc-600/50 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                    <div className="w-full h-full flex items-center justify-center text-zinc-200 font-bold text-base">
                      {candidate.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-50">{candidate.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-400 mt-0.5">
                      <Target className="w-3 h-3" /> {candidate.role}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5"># {candidate.id}</div>
                  </div>
                </div>
                <button className="text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="More options">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Status</span>
                <span className="text-xs font-semibold text-zinc-500 uppercase">Match</span>
              </div>

              <div className="flex items-center justify-between mb-5">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    candidate.status === "Qualified"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : candidate.status === "In Review"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  {candidate.status}
                </span>
                <div className="flex items-center gap-2 w-2/5">
                  <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-300 rounded-full transition-all duration-700" style={{ width: `${candidate.matchScore}%` }} />
                  </div>
                  <span className="text-sm font-bold text-zinc-100">{candidate.matchScore}%</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/60">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {candidate.date}
                </div>
                <button
                  onClick={() => onSelect(candidate)}
                  className="group bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Start <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
