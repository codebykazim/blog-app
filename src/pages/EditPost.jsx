"use client"

import { useState, useEffect } from "react"
import { Container, PostForm } from "../components"
import service from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "lucide-react"

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
        setLoading(false)
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

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
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost