"use client"

import { useState, useEffect } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"
import { Loader } from "lucide-react"

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
