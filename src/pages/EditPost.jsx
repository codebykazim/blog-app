import React, {useState, useEffect} from 'react'
import {Container, PostForm} from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost]=useState(null);
    const {slug} =useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((post)=>{
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/');
        }
    },[slug, navigate])

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-[#A6C36F] to-[#335145] py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost