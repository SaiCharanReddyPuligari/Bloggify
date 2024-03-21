import React, {useState, useEffect} from "react";
import { Container, PostCard } from "../components";
import service from '../appwrite/config'


function AllPosts(){
    const [posts, setPosts]= useState([])
    useEffect(() => {
     service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents) //post containts documents object with all posts
                        }
                    })
                    .catch((error) => console.log("Failed to get all posts from appwrite", error))
                }, [])
    return(
    <div className="w-full">
       <Container>
        <div className="flex flex-wrap">
        {posts.map((post)=>(
            <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post}/>
            </div>
        ))}
        </div>
       </Container>
    </div>
    )
}

export default AllPosts;