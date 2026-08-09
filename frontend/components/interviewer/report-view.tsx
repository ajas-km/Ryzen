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

const competencies = [
  { label: "Technical Depth", score: 92 },
  { label: "Communication", score: 85 },
  { label: "Problem Solving", score: 89 },
  { label: "Culture Fit", score: 78 },
]

export function ReportView({ candidate, onBack }: { candidate: Candidate; onBack: () => void }) {
  return (
    <section className="flex-1 bg-[#09090b] text-zinc-200 animate-in fade-in duration-300">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" /> Back to candidates
        </button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 md:p-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center">
            <div className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center">
              <Award className="h-9 w-9 text-emerald-400" />
              <span className="mt-2 text-2xl font-bold text-zinc-100">88%</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Overall score</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-emerald-400">
                  Assessment complete
                </span>
                <span className="text-zinc-600">Today</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Interview report: {candidate.name}</h1>
              <p className="mt-2 text-zinc-500">AI-powered performance analysis for the {candidate.role} interview.</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ReportStat label="Overall score" value="88%" accent />
                <ReportStat label="Percentile" value="Top 12%" />
                <ReportStat label="Duration" value="45m" />
                <ReportStat label="Status" value="Recommended" success />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            <FileDown className="h-4 w-4" /> Download report
          </button>
        </div>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-zinc-100">Competency breakdown</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((competency) => (
              <div key={competency.label} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <CircleGauge className="h-5 w-5 text-zinc-500" />
                  <span className="font-semibold text-zinc-200">{competency.score}%</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{competency.label}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-zinc-300" style={{ width: `${competency.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <FeedbackCard
            title="Key strengths"
            description="Areas where the candidate exceeded expectations."
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            tone="border-emerald-500/20 bg-emerald-500/5"
            items={[
              ["Architectural thinking", "Explained scalable design decisions clearly and connected them to business outcomes."],
              ["Concise communication", "Presented technical trade-offs with clarity, focus, and confidence."],
            ]}
          />
          <FeedbackCard
            title="Areas for improvement"
            description="Opportunities to strengthen future interview performance."
            icon={<XCircle className="h-5 w-5 text-amber-400" />}
            tone="border-amber-500/20 bg-amber-500/5"
            items={[
              ["System performance edge cases", "Add more detail on monitoring and optimization for high-volume scenarios."],
              ["Testing depth", "Expand on unit-test strategy and examples for core business logic."],
            ]}
          />
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-zinc-300" />
            <h2 className="text-xl font-bold text-zinc-100">AI-generated feedback</h2>
          </div>
          <p className="mt-1 text-sm text-zinc-500">Tailored next steps based on this interview and role requirements.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "Review memory profiling tools and performance metrics for large-scale applications.",
              "Include more test-driven development examples in your project stories.",
              "Lead a technical workshop to further strengthen mentoring and communication skills.",
            ].map((suggestion) => (
              <div key={suggestion} className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4 text-sm leading-relaxed text-zinc-300">
                {suggestion}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-4 border-t border-zinc-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-zinc-100">Recommendation</h3>
              <p className="mt-1 text-sm text-zinc-500">Proceed to a final culture-fit interview with the team lead.</p>
            </div>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white">
              <MessageSquare className="h-4 w-4" /> Share feedback
            </button>
          </div>
        </section>
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
  items: [string, string][]
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
      <div className="flex items-center gap-2">{icon}<h2 className="text-xl font-bold text-zinc-100">{title}</h2></div>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
      <div className="mt-5 space-y-3">
        {items.map(([heading, copy]) => (
          <div key={heading} className={`rounded-xl border p-4 ${tone}`}>
            <p className="font-semibold text-zinc-200">{heading}</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{copy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
