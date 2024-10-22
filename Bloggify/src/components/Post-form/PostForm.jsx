import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  // console.log(post);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm();
  //  {}
  //     defaultValues: {
  //         title: post?.title || "",
  //         slug: post?.$id || "",
  //         content: post?.content || "",
  //         status: post?.status || "active",
  //     },
  // });

  const params = useParams();
  useEffect(() => {
    if (post) {
      setValue("title", post?.title || "");
      setValue("slug", post?.slug || params.slug || "");
      setValue("content", post?.content || "");
      setValue("status", post?.status || "active");
    }
  }, [post, setValue, params]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // console.log(data);
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const fileType = data.image[0];
      if (fileType) {
        const file = await service.uploadFile(fileType);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await service.createPost({
            ...data,
            userId: userData.$id,
          });
          console.log("1", dbPost);
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className=" w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 w-full "
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 w-full"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 w-full "
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 w-full "
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full hover:bg-[#3b0764] hover:text-white"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
