import { BookOpen } from "lucide-react"

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-3" style={{ width }}>
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <div className="font-black text-2xl text-gray-900 tracking-tight">
        Blog<span className="text-green-600">Hub</span>
      </div>
    </div>
  )
}

export default Logo
