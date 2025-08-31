"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import service from "../appwrite/config"
import { Container, PostCard, Button } from "../components"
import { Loader, PenTool, BookOpen } from "lucide-react"

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    service
      .getAllPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching posts:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading amazing stories...</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-6 text-balance">
              {authStatus ? "Ready to Share Your Story?" : "Welcome to BlogHub"}
            </h1>
            <p className="text-xl text-gray-600 mb-10 text-pretty leading-relaxed">
              {authStatus
                ? "You're all set! Create your first post and start sharing your thoughts with the world."
                : "Discover amazing stories, connect with passionate writers, and share your own unique perspective with our growing community."}
            </p>
            {!authStatus ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="shadow-lg hover:shadow-xl">
                    Join Our Community
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/add-post">
                <Button size="lg" className="shadow-lg hover:shadow-xl">
                  <PenTool className="w-5 h-5 mr-2" />
                  Write Your First Post
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-12 bg-gradient-to-br from-green-50/30 to-emerald-50/30 min-h-screen">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Latest Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover fresh perspectives and engaging content from our community of writers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {posts.map((post) => (
            <div key={post.$id} className="animate-slide-up">
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {authStatus && (
          <div className="mt-16 text-center">
            <Link to="/add-post">
              <Button size="lg" className="shadow-lg hover:shadow-xl">
                <PenTool className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home
