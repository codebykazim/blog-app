"use client"

import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Upload } from "lucide-react"

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    try {
      const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null

      if (post) {
        if (file) {
          service.deleteFile(post.featuredImage)
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        if (file) {
          data.featuredImage = file.$id
        }

        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")

    return ""
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto">
      <div className="flex flex-wrap bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-full lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Post Details</h2>

          <div className="space-y-6">
            <Input label="Title" placeholder="Enter post title" {...register("title", { required: true })} />

            <Input
              label="Slug"
              placeholder="post-url-slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }}
            />

            <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-6 lg:p-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Publication Settings</h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Featured Image</label>
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-6
                text-center hover:border-blue-400 transition-colors"
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  id="image-upload"
                  {...register("image", { required: !post })}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG or GIF (Max 2MB)</p>
                </label>
              </div>
            </div>

            {post && post.featuredImage && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Image</label>
                <img
                  src={service.getFilePreview(post.featuredImage) || "/placeholder.svg"}
                  alt={post.title}
                  className="rounded-lg w-full aspect-video object-cover"
                />
              </div>
            )}

            <Select options={["active", "inactive"]} label="Status" {...register("status", { required: true })} />

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${post ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {post ? "Updating..." : "Publishing..."}
                </div>
              ) : post ? (
                "Update Post"
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
