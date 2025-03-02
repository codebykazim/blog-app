"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"
import { Loader } from "lucide-react"

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
        setLoading(false)
      })
    } else navigate("/")
  }, [slug, navigate])

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  return post ? (
    <div className="w-full py-8 bg-gray-50">
      <Container>
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="w-full relative">
            <img
              src={service.getFilePreview(post.featuredImage) || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-purple-500 hover:bg-purple-600">Edit</Button>
                </Link>
                <Button className="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Post Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

            {/* Post Content */}
            <div className="prose max-w-none text-gray-700">{parse(post.content)}</div>
          </div>
        </article>
      </Container>
    </div>
  ) : null
}