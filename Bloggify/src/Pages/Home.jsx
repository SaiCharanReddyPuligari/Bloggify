import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Skeleton } from "../components";
import { Link } from "react-router-dom";
import { Button } from "../components/index.js";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0 && !authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="min-h-[50vh] flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold mb-4 font-mono ">
                SignUp / Login to read posts
              </h1>
              <div className="flex flex-col gap-6">
                  <Link to="/signup">
                    <Button bgColor="bg-primary" className="m-4">
                      Signup
                    </Button>
                  </Link>
                <Link to="/login">
                  <Button bgColor="bg-primary">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (posts.length === 0 && authStatus) {
    return (
        <div className='h-[70vh] flex justify-center items-center'>
            <Skeleton />
        </div>
    )
}
  return (
    <div className="w-full min-h-screen py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
