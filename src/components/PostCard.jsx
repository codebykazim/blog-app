import { Link } from "react-router-dom"
import service from "../appwrite/config"
import parse from "html-react-parser"

function PostCard({ $id, title, featuredImage, content, name,date='aajn', $createdAt}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="group space-y-4">
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={service.getFilePreview(featuredImage) || "/placeholder.svg?height=300&width=400"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
          />
        </div>

        {/* Content Container */}
        <div className="space-y-3">

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-500 transition-colors">
            {title}
          </h2>

          <div className="prose max-w-none text-gray-700">
  {parse(content.length > 150 ? content.substring(0, 150) + "..." : content)}
</div>


          {/* Author Info */}
          <div className="flex items-center space-x-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="/placeholder.svg?height=32&width=32" alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{name}</span>
              <span className="text-sm text-gray-500">{new Date($createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
