import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

//appwrite sends

function PostCard(post) {
  //const {$id, title, featuredImage} = post;
  const date = new Date(post.$createdAt).toLocaleDateString("en-US");
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-[#95B4cc] rounded-xl px-4 py-4 hover:shadow-lg">
        <div className="w-full justify-center mb-3">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p>{date}</p>
      </div>
    </Link>
  );
}

export default PostCard;
