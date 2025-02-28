import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import service from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
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

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF6F0] to-[#2C786C] py-8">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {/* Featured Image */}
          <div className="w-full mb-6 relative">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
            />
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                    Edit
                  </Button>
                </Link>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Title */}
          <h1 className="text-4xl font-extrabold text-[#2C786C] mb-4">
            {post.title}
          </h1>

          {/* Post Content */}
          <div className="prose max-w-none text-[#2C786C]">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}
