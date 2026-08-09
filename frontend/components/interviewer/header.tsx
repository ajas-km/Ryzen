import { MessageSquare } from "lucide-react"

export function Header() {
  return (
    <header className="bg-[#09090b] border-b border-zinc-800 px-6 py-4 flex items-center sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-sm">
          <MessageSquare className="w-4 h-4 text-zinc-100" />
        </div>
        <span className="font-semibold text-lg text-zinc-100 tracking-tight">AI interPro</span>
      </div>
    </header>
  )
}
