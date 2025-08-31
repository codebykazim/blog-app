"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import { Calendar, Clock, Loader, Edit, Trash2 } from "lucide-react"

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      service
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post)
          } else {
            navigate("/")
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching post:", error)
          navigate("/")
          setLoading(false)
        })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    try {
      const status = await service.deletePost(post.$id)
      if (status) {
        if (post.featuredImage) {
          await service.deleteFile(post.featuredImage)
        }
        navigate("/")
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  return post ? (
    <div className="w-full min-h-screen relative">
      {/* Full Screen Image Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={service.getFilePreview(post.featuredImage) || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover blur-sm"
          onError={(e) => {
            e.target.src = "/blog-post-background.png"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        <div className="px-6 md:px-10 lg:px-20 pb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-wide shadow-md">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white" />
              <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
            </div>
            {post.authorName && (
              <div className="flex items-center gap-2">
                <span>By {post.authorName}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white" />
              <span>{Math.ceil(post.content.split(" ").length / 200)} min read</span>
            </div>
          </div>
        </div>

        {/* Author Actions */}
        {isAuthor && (
          <div className="absolute top-6 right-6 flex gap-3">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105">
                <Edit className="w-4 h-4" /> Edit
              </Button>
            </Link>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105"
              onClick={deletePost}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" /> Delete
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <Container>
        <div className="max-w-2xl mx-auto relative z-10 bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8 md:p-10 mt-10 mb-10">
          <div className="prose prose-lg max-w-none text-gray-900">{parse(post.content)}</div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-300">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium shadow-md transition-transform transform hover:scale-110"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null
}
