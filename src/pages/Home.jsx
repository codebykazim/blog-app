"use client"

import { useEffect, useState } from "react"
import service from "../appwrite/config"
import authService from "../appwrite/auth"
import { Container, PostCard } from "../components"
import { Loader } from "lucide-react"

function Home() {
  const [posts, setPosts] = useState([])
  const [user, setUser] =useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        console.log(posts.documents);

      }
      setLoading(false)
    })
  }, [])

  // useEffect(()=>{
  //   authService.getCurrentUser().then((users)=> {
  //     if(users) {
  //       setUser(users);
  //       console.log(users);

  //     }
  //   })
  // },[])

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-gray-50">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-4xl font-bold text-gray-900">Login to read posts</h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} {...user}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home