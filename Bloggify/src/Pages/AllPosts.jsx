import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";


function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents); //post containts documents object with all posts
        }
      })
      .catch((error) =>
        console.log("Failed to get all posts from appwrite", error)
      );
  }, []);

  if (posts.length == 0) {
    return (
        <div className='h-[70vh] flex justify-center items-center'>
            <Skeleton />
        </div>
    )
    };
  return (
    <div className='w-full py-8 md:pt-10'>
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <div key={post.$id} className='p-2 hover:scale-95 transition-all duration-200'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
