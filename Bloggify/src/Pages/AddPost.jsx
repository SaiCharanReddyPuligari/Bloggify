import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="w-full py-8 min-h-screen">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
