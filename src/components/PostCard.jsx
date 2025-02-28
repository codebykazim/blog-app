import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import service from "../appwrite/config"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div
        className="group overflow-hidden bg-white rounded-xl
        shadow-lg hover:shadow-xl transition-all duration-300 border border-[#828C51]"
      >
        {/* Image Container */}
        <div className="w-full h-52 overflow-hidden relative">
          <img
            src={service.getFilePreview(featuredImage) || "/placeholder.svg?height=208&width=400"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#335145]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title and Subtitle Container */}
        <div className="p-6 bg-[#F5F5F5]">
          <h2
            className="text-xl font-bold text-[#335145]
            group-hover:text-[#A6C36F] transition-colors duration-200 line-clamp-2 mb-3"
          >
            {title}
          </h2>
          <div className="flex items-center text-[#828C51] group-hover:text-[#A6C36F] transition-colors duration-200">
            <span className="text-sm font-medium">Read Blog</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard