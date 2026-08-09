import {
  ArrowLeft,
  Award,
  CheckCircle2,
  CircleGauge,
  FileDown,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  XCircle,
} from "lucide-react"
import type { ReactNode } from "react"
import type { Candidate } from "./data"
import type { FeedbackData } from "./interviewer-app"

export function ReportView({
  candidate,
  feedback,
  onBack,
}: {
  candidate: Candidate
  feedback: FeedbackData | null
  onBack: () => void
}) {
  // Use real feedback data or show defaults
  const summary = feedback?.summary || "Interview assessment completed."
  const strengths = feedback?.strengths || []
  const gaps = feedback?.gaps || []
  const suggestions = feedback?.next || []

  return (
    <section className="flex-1 bg-[#09090b] text-zinc-200 animate-in fade-in duration-300">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-100 print:hidden"
        >
          <ArrowLeft className="h-4 w-4" /> Back to candidates
        </button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 md:p-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center">
            <div className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center">
              <Award className="h-9 w-9 text-emerald-400" />
              <span className="mt-2 text-2xl font-bold text-zinc-100">{candidate.matchScore}%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Match score</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-emerald-400">
                  Assessment complete
                </span>
                <span className="text-zinc-600">Today</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Interview report: {candidate.name}</h1>
              <p className="mt-2 text-zinc-500">{summary}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ReportStat label="Match score" value={`${candidate.matchScore}%`} accent />
                <ReportStat label="Status" value={candidate.status} success={candidate.status === "Qualified"} />
                <ReportStat label="Role" value={candidate.role} />
                <ReportStat label="Strengths" value={`${strengths.length} found`} />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 print:hidden"
          >
            <FileDown className="h-4 w-4" /> Download report
          </button>
        </div>

        {/* Feedback sections — only show if we have real data */}
        {(strengths.length > 0 || gaps.length > 0) && (
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {strengths.length > 0 && (
              <FeedbackCard
                title="Key strengths"
                description="Areas where the candidate performed well."
                icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                tone="border-emerald-500/20 bg-emerald-500/5"
                items={strengths}
              />
            )}
            {gaps.length > 0 && (
              <FeedbackCard
                title="Areas for improvement"
                description="Opportunities to strengthen future performance."
                icon={<XCircle className="h-5 w-5 text-amber-400" />}
                tone="border-amber-500/20 bg-amber-500/5"
                items={gaps}
              />
            )}
          </section>
        )}

        {suggestions.length > 0 && (
          <section className="mt-6 rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-zinc-300" />
              <h2 className="text-xl font-bold text-zinc-100">AI-generated recommendations</h2>
            </div>
            <p className="mt-1 text-sm text-zinc-500">Tailored next steps based on this interview and role requirements.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {suggestions.map((suggestion, i) => (
                <div key={i} className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4 text-sm leading-relaxed text-zinc-300">
                  {suggestion}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-zinc-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-zinc-100">Summary</h3>
                <p className="mt-1 text-sm text-zinc-500">{summary}</p>
              </div>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white print:hidden">
                <MessageSquare className="h-4 w-4" /> Share feedback
              </button>
            </div>
          </section>
        )}

        {/* Fallback if no feedback data at all */}
        {!feedback && (
          <section className="mt-10 text-center py-12">
            <p className="text-zinc-500 text-lg">No detailed feedback available for this session.</p>
          </section>
        )}
      </div>
    </section>
  )
}

function ReportStat({ label, value, accent, success }: { label: string; value: string; accent?: boolean; success?: boolean }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-1 text-lg font-bold ${accent ? "text-zinc-100" : success ? "text-emerald-400" : "text-zinc-200"}`}>{value}</p>
    </div>
  )
}

function FeedbackCard({
  title,
  description,
  icon,
  tone,
  items,
}: {
  title: string
  description: string
  icon: ReactNode
  tone: string
  items: string[]
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
      <div className="flex items-center gap-2">{icon}<h2 className="text-xl font-bold text-zinc-100">{title}</h2></div>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
      <div className="mt-5 space-y-3">
        {items.map((item, i) => (
          <div key={i} className={`rounded-xl border p-4 ${tone}`}>
            <p className="text-sm leading-relaxed text-zinc-200">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
