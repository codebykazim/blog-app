import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BEEF9E] to-[#1E352F] py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost