import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import {Container, PostCard } from '../components'

function AllPosts() {
    const [posts,setPosts]= useState([]);

    useEffect(()=>{
        service.getAllPosts([]).then((posts)=> {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    },[])

  return (
    <div>
        <Container>
            <div>
            {posts.map((post)=>(
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