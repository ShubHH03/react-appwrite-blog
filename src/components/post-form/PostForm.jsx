import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) appwriteService.deleteFile(post.featuredImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black flex items-center justify-center px-4 py-10 text-white">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          {post ? "Edit Post ✍️" : "Create New Post 📝"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-2/3 space-y-6">
            <Input
              label="Title"
              placeholder="Enter your post title"
              className="bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 rounded-lg"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              className="bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 rounded-lg"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }
            />

            <div>
              <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 space-y-6">
            <Input
              label="Featured Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 rounded-lg"
              {...register("image", { required: !post })}
            />

            {post && (
              <div className="w-full">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg shadow-lg border border-white/10"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status"
              className="bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 rounded-lg"
              {...register("status", { required: true })}
            />

            <Button
              type="submit"
              bgColor={post ? "bg-green-600" : "bg-blue-600"}
              className="w-full py-3 font-semibold text-lg rounded-xl hover:opacity-90 transition-all duration-200"
            >
              {post ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
