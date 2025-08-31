"use client"

import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Upload, X, ImageIcon } from "lucide-react"

export default function PostForm({ post }) {
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const watchImage = watch("image")

  // Handle image preview
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [watchImage])

  const submit = async (data) => {
    try {
      setUploadProgress(0)
      let file = null

      if (data.image?.[0]) {
        setUploadProgress(25)
        file = await service.uploadFile(data.image[0])
        if (!file) {
          throw new Error("Failed to upload image")
        }
        setUploadProgress(50)
      }

      if (post) {
        if (file && post.featuredImage) {
          // Delete old image if new one is uploaded
          await service.deleteFile(post.featuredImage)
        }

        setUploadProgress(75)
        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        })

        if (dbPost) {
          setUploadProgress(100)
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        // Create new post
        if (!file) {
          throw new Error("Featured image is required for new posts")
        }

        setUploadProgress(75)
        const dbPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        })

        if (dbPost) {
          setUploadProgress(100)
          navigate(`/post/${dbPost.$id}`)
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error)
      alert(error.message || "Failed to save post. Please try again.")
      setUploadProgress(0)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")

    return ""
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])

  const clearImagePreview = () => {
    setImagePreview(null)
    setValue("image", null)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-7xl mx-auto">
      <div className="flex flex-wrap bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-full lg:w-2/3 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Post Details</h2>

          <div className="space-y-6">
            <Input
              label="Title"
              placeholder="Enter post title"
              error={errors.title?.message}
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
              })}
            />

            <Input
              label="Slug"
              placeholder="post-url-slug"
              error={errors.slug?.message}
              {...register("slug", {
                required: "Slug is required",
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: "Slug can only contain lowercase letters, numbers, and hyphens",
                },
              })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }}
            />

            <div className="mb-6">
              <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
              {errors.content && <p className="mt-1.5 text-sm text-red-500">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-6 lg:p-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Publication Settings</h3>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image {!post && <span className="text-red-500">*</span>}
              </label>

              {/* Current Image Preview */}
              {post && post.featuredImage && !imagePreview && (
                <div className="relative">
                  <img
                    src={service.getFilePreview(post.featuredImage, 400, 300, 90) || "/placeholder.svg"}
                    alt={post.title}
                    className="rounded-lg w-full aspect-video object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=300&text=Image+Not+Found"
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Current</span>
                  </div>
                </div>
              )}

              {/* New Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="rounded-lg w-full aspect-video object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={clearImagePreview}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors
                ${errors.image ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-blue-400"}`}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                  id="image-upload"
                  {...register("image", {
                    required: !post ? "Featured image is required" : false,
                    validate: {
                      fileSize: (files) => {
                        if (!files || !files[0]) return true
                        return files[0].size <= 2 * 1024 * 1024 || "File size must be less than 2MB"
                      },
                      fileType: (files) => {
                        if (!files || !files[0]) return true
                        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"]
                        return (
                          allowedTypes.includes(files[0].type) || "Only PNG, JPG, JPEG, GIF, and WebP files are allowed"
                        )
                      },
                    },
                  })}
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="flex flex-col items-center">
                    {imagePreview ? (
                      <ImageIcon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                    ) : (
                      <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                    )}
                    <p className="text-sm text-gray-500">
                      {imagePreview ? "Click to change image" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG, GIF, WebP (Max 2MB)</p>
                  </div>
                </label>
              </div>

              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <Select
              options={["active", "inactive"]}
              label="Status"
              error={errors.status?.message}
              {...register("status", { required: "Status is required" })}
            />

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${post ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
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
