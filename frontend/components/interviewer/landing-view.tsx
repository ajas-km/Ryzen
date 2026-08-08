import { MessageSquare, CheckCircle2, Target, Lightbulb, ChevronRight, Users, FileText } from "lucide-react"

export function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#060a14] text-slate-200 font-sans overflow-hidden flex flex-col relative w-full">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)`,
          backgroundSize: "42px 42px",
          backgroundPosition: "-1px -1px",
        }}
      />

      {/* Header */}
      <header className="h-16 bg-[#090e1a]/90 border-b border-blue-500/25 flex items-center justify-between px-10 relative z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center animate-icon-glow">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-[16.5px] text-slate-100 tracking-tight">AI Interviewer Pro</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-slate-400">
          <a href="#" className="hover:text-slate-200 transition-colors">
            Product
          </a>
          <a href="#" className="text-blue-400 font-semibold drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]">
            Solutions
          </a>
          <a href="#" className="hover:text-slate-200 transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-slate-200 transition-colors">
            Enterprise
          </a>
          <a href="#" className="hover:text-slate-200 transition-colors">
            Resources
          </a>
        </nav>
        <div className="flex items-center gap-3.5">
          <button
            onClick={onStart}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[13.5px] font-semibold px-4.5 py-2 rounded-lg border border-blue-300/50 shadow-[0_0_16px_rgba(37,99,235,0.6)] hover:shadow-[0_0_24px_rgba(37,99,235,0.8)] transition-all"
          >
            Enter Portal
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex-1 flex flex-col items-center justify-center min-h-[460px] border-b border-blue-500/20 z-10"
        style={{
          background: `radial-gradient(circle at 15% 20%, rgba(37,99,235,0.22), transparent 45%), radial-gradient(circle at 85% 10%, rgba(59,130,246,0.18), transparent 42%), linear-gradient(180deg, #060a14 0%, #0a1020 100%)`,
        }}
      >
        {/* Floating Cards */}
        <div className="absolute top-[90px] left-[10%] w-[200px] bg-[#0d1321]/90 border border-blue-500/35 rounded-xl p-3 flex items-center gap-2.5 animate-float-drift backdrop-blur-md hidden lg:flex">
          <div className="w-7 h-7 rounded-lg bg-green-500/15 shadow-[0_0_10px_rgba(34,197,94,0.4)] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <div className="font-bold text-slate-100 text-xs">Bias-Free Scoring</div>
            <div className="text-slate-500 text-[11px]">Objective criteria, every time</div>
          </div>
        </div>

        <div className="absolute bottom-[60px] right-[10%] w-[210px] bg-[#0d1321]/90 border border-blue-500/35 rounded-xl p-3 flex items-center gap-2.5 animate-float-drift-delayed backdrop-blur-md hidden lg:flex">
          <div className="w-7 h-7 rounded-lg bg-blue-600/18 shadow-[0_0_10px_rgba(59,130,246,0.5)] flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="font-bold text-slate-100 text-xs">94% Match Score</div>
            <div className="text-slate-500 text-[11px]">Sarah Jenkins — Qualified</div>
          </div>
        </div>

        <div className="max-w-[780px] text-center px-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-600/10 text-blue-300 text-[12.5px] font-bold px-3.5 py-1.5 rounded-full border border-blue-400/50 tracking-wide mb-5 animate-badge-pulse">
            <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
            AI-POWERED STRUCTURED INTERVIEWS
          </div>
          <h1 className="text-[47px] leading-[1.12] font-extrabold tracking-tight text-slate-50 mb-4.5 text-balance">
            Elevate Your Hiring with
            <br />
            <span className="text-blue-400 drop-shadow-[0_0_24px_rgba(59,130,246,0.85)]">
              Precision AI Intelligence.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-[620px] mx-auto mb-8 text-pretty">
            Conduct structured, consistent, and bias-free interviews at scale.
          </p>
          <div className="flex items-center justify-center gap-3.5 mb-7">
            <button
              onClick={onStart}
              className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-[15px] px-6 py-3 rounded-xl flex items-center gap-2 border border-blue-300/60 animate-cta-glow"
            >
              Enter Assessment Portal
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[12.5px] text-slate-500 font-medium">
            Select your profile · Trusted by 500+ talent teams
          </div>
        </div>
      </section>

      {/* Logos Strip */}
      <div className="h-14 bg-[#080c17] flex items-center justify-center gap-12 border-b border-blue-500/20 relative z-10 overflow-hidden hidden md:flex">
        {["VERTEX", "NORTHPEAK", "QUANTIVA", "BRIGHTSCALE", "ORBITAL", "HALCYON"].map((logo) => (
          <span key={logo} className="text-[13px] font-bold text-slate-700 tracking-wider">
            {logo}
          </span>
        ))}
      </div>

      {/* Features */}
      <section className="bg-[#060a14] py-10 px-10 flex flex-col items-center relative z-10">
        <div className="text-center mb-6">
          <div className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-1.5 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Why Teams Choose Us
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Built for consistent, defensible hiring decisions
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-5 w-full max-w-[1160px]">
          <div className="flex-1 bg-gradient-to-b from-blue-600/15 to-[#0b1120]/90 border border-blue-400/75 rounded-2xl p-5 animate-card-glow relative">
            <div className="w-9 h-9 bg-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.6)] rounded-lg flex items-center justify-center mb-3">
              <CheckCircle2 className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <h3 className="text-[14.5px] font-bold text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)] mb-1.5">
              Structured Bias Removal
            </h3>
            <p className="text-[12.5px] text-slate-400 leading-relaxed">
              Ensure every candidate is evaluated against the same objective criteria, eliminating inconsistent human
              judgment.
            </p>
          </div>

          <div className="flex-1 bg-[#0b1120] border border-blue-500/20 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-blue-600/15 rounded-lg flex items-center justify-center mb-3">
              <Users className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <h3 className="text-[14.5px] font-bold text-slate-100 mb-1.5">Consistent At Scale</h3>
            <p className="text-[12.5px] text-slate-400 leading-relaxed">
              Run hundreds of identical, structured interviews simultaneously without sacrificing quality or depth.
            </p>
          </div>

          <div className="flex-1 bg-[#0b1120] border border-blue-500/20 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-blue-600/15 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <h3 className="text-[14.5px] font-bold text-slate-100 mb-1.5">Actionable Reports</h3>
            <p className="text-[12.5px] text-slate-400 leading-relaxed">
              Every session generates a detailed, shareable summary with match scores and evidence-backed insights.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
