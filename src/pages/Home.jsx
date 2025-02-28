"use client"

import { useEffect, useState } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"
import { Loader } from "lucide-react"

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#0F3D3E] animate-spin" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-4xl font-extrabold text-[#0F3D3E]">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-gradient-to-br from-[#F5E8C7] to-[#3C6255] min-h-screen">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-[1.05] p-6 hover:shadow-2xl"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
