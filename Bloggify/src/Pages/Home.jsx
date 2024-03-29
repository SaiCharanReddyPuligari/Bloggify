import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { Button } from "../components/index.js";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="min-h-[50vh] flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold mb-4 font-mono">
                SignUp / Login to read posts
              </h1>
              <div className="flex flex-col gap-6">
                <Link to="/signup">
                  <Button bgColor="bg-primary">Signup</Button>
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
  return (
    <div className="w-full py-8">
      <Container>
        <div>
          {posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
