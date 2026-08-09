import { MessageSquare, Lightbulb, ChevronRight } from "lucide-react"

export function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans overflow-hidden flex flex-col relative w-full">
      {/* Subtle Noise/Gradient Background (Premium, minimal) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-8 left-8 md:left-12 z-20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-sm">
          <MessageSquare className="w-4 h-4 text-zinc-100" />
        </div>
        <span className="font-semibold text-lg text-zinc-100 tracking-tight">AI interPro</span>
      </div>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center min-h-[460px] z-10 w-full px-6">

        <div className="max-w-4xl text-center relative z-10 mt-12 md:mt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8 shadow-sm backdrop-blur-sm">
            <Lightbulb className="w-3.5 h-3.5 text-zinc-400" />
            <span>AI-POWERED STRUCTURED INTERVIEWS</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-50 mb-6 text-balance leading-[1.1]">
            Elevate Your Hiring with
            <br />
            <span className="text-zinc-400">
              Precision AI Intelligence.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10 text-pretty font-light">
            Conduct structured, consistent, and bias-free interviews at scale.
          </p>
          
          {/* CTA */}
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={onStart}
              className="group bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-[15px] px-8 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
            >
              Start Interview
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="text-sm text-zinc-500">
            Select your profile · Trusted by 500+ talent teams
          </div>
        </div>
      </section>
    </div>
  )
}
