"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import service from "../appwrite/config"
import { Calendar, Clock } from "lucide-react"

function PostCard({ $id, title, featuredImage, content, userId, authorName, $createdAt }) {
  const [author, setAuthor] = useState(authorName || "Unknown User")
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    console.log("[v0] PostCard - featuredImage:", featuredImage)
    console.log("[v0] PostCard - title:", title)
    if (featuredImage) {
      const imageUrl = service.getFilePreview(featuredImage, 400, 300, 90)
      console.log("[v0] PostCard - generated image URL:", imageUrl)
    }
  }, [featuredImage, title])

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!authorName && userId) {
        try {
          const user = await service.getUser(userId)
          if (user) {
            setAuthor(user.name)
          }
        } catch (error) {
          console.error("Error fetching author:", error)
        }
      }
    }

    fetchAuthor()
  }, [userId, authorName])

  // Use Appwrite's avatar API for consistent colored initials
  const avatarUrl = `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(author)}&width=32&height=32`

  const handleImageError = () => {
    console.log("[v0] PostCard - Image failed to load for:", title)
    setImageError(true)
  }

  // Extract plain text from HTML content for preview
  const getTextPreview = (htmlContent) => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlContent
    const textContent = tempDiv.textContent || tempDiv.innerText || ""
    return textContent.length > 150 ? textContent.substring(0, 150) + "..." : textContent
  }

  return (
    <Link to={`/post/${$id}`} className="block group">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          {!imageError && featuredImage ? (
            <img
              src={service.getFilePreview(featuredImage, 400, 300, 90) || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">{title.charAt(0).toUpperCase()}</span>
                </div>
                <p className="text-sm text-gray-500">No Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
            {title}
          </h2>

          <p className="text-gray-600 line-clamp-3 leading-relaxed">{getTextPreview(content)}</p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={avatarUrl || "/placeholder.svg"}
                alt={author}
                className="w-8 h-8 rounded-full border border-gray-200"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=32&width=32&text=" + author.charAt(0)
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{author}</span>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date($createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.ceil(content.split(" ").length / 200)} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
