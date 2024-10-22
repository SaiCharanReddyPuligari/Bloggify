import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container, Skeleton } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  //console.log(userData);
  //console.log(post);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  //console.log(isAuthor);

  useEffect(() => {
    if (slug) {
      service.getDocumentById(slug).then((post) => {
        //console.log(post);
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  //        <span class="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 dark:bg-transparent">elevated button</span>
  window.scrollTo(0, 0);

  if (!post) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Skeleton />
            </div>
        )
    }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="max-w-5xl mb-4 relative rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          /> {""}
          {isAuthor && (
            <div className=" absolute sm:right-6 sm:top-6 -bottom-9 right-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full text-center sm:text-start sm:pt-2 pt-6">
          <h1 className=" md:text-3xl text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css sm:text-xl text-xs">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
