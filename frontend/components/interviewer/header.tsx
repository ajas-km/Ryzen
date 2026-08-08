import { MessageSquare, Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-md">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-lg tracking-tight">AI Interviewer Pro</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
        <a href="#" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </a>
        <a href="#" className="text-slate-900 border-b-2 border-slate-900 pb-1 -mb-[17px]">
          Interviews
        </a>
        <a href="#" className="hover:text-slate-900 transition-colors">
          Settings
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-600 relative" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
            <User className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">Recruiter Admin</span>
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  )
}
