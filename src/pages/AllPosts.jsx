import React, { useState, useEffect } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF6F0] to-[#2C786C] py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 p-6">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
