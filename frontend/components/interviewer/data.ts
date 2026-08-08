export type ViewState = "landing" | "selection" | "chat" | "summary"

export type Candidate = {
  id: string
  name: string
  role: string
  status: "Qualified" | "In Review" | "Screening"
  matchScore: number
  date: string
  avatarUrl?: string
}

export const CANDIDATES: Candidate[] = [
  {
    id: "CAN-8821",
    name: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    status: "Qualified",
    matchScore: 94,
    date: "Oct 12, 2023",
  },
  {
    id: "CAN-9012",
    name: "Michael Chen",
    role: "Full Stack Developer",
    status: "In Review",
    matchScore: 88,
    date: "Oct 14, 2023",
  },
  {
    id: "CAN-7734",
    name: "Elena Rodriguez",
    role: "Product Designer",
    status: "Qualified",
    matchScore: 91,
    date: "Oct 10, 2023",
  },
  {
    id: "CAN-4452",
    name: "David Park",
    role: "DevOps Architect",
    status: "Screening",
    matchScore: 78,
    date: "Oct 15, 2023",
  },
  {
    id: "CAN-5589",
    name: "Aisha Patel",
    role: "Backend Engineer",
    status: "Qualified",
    matchScore: 89,
    date: "Oct 16, 2023",
  },
  {
    id: "CAN-6621",
    name: "James Wilson",
    role: "Data Scientist",
    status: "In Review",
    matchScore: 82,
    date: "Oct 17, 2023",
  },
]

export type ChatMessage = {
  id: number
  sender: "ai" | "user"
  time: string
  text: string
  attachment?: string
}

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    sender: "ai",
    time: "10:00 AM",
    text: "Good morning. I am your AI interviewer for today's Technical Product Manager assessment. We will focus on your experience with agile methodologies, stakeholder management, and technical roadmap prioritization. To start, could you please upload your latest resume and provide a brief overview of your most recent project?",
  },
  {
    id: 2,
    sender: "user",
    time: "10:02 AM",
    text: "Thank you. I'm excited to be here. I've uploaded my resume. My most recent project involved leading a cross-functional team of 15 to migrate our legacy cloud infrastructure to a microservices architecture, which improved system uptime by 24%.",
    attachment: "resume_sarah_j_2024.pdf",
  },
  {
    id: 3,
    sender: "ai",
    time: "10:03 AM",
    text: "That sounds like a significant undertaking. Improving uptime by 24% is a strong metric. When managing that migration, how did you handle conflicting priorities between the engineering team wanting to refactor and the business side pushing for new feature releases?",
  },
]
