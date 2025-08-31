import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query, Account } from "appwrite"

export class Service {
  client = new Client()
  databases
  bucket
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
    this.account = new Account(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const user = await this.account.get()

      const formattedSlug = slug
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

      const documentId = formattedSlug || ID.unique()

      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId, {
        title,
        content,
        featuredImage,
        status,
        userId,
        authorName: user.name,
      })
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error)
      throw error
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      })
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error)
      throw error
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
      return true
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error)
      return false
    }
  }

  async getUser(userId) {
    try {
      return await this.account.get(userId)
    } catch (error) {
      console.error("Appwrite service :: getUser :: error", error)
      return null
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error)
      throw error
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [
        ...queries,
        Query.orderDesc("$createdAt"),
      ])
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error)
      return false
    }
  }

  async uploadFile(file) {
    try {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size must be less than 2MB")
      }

      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only PNG, JPG, JPEG, GIF, and WebP files are allowed")
      }

      // Create unique file ID
      const fileId = ID.unique()

      // Upload file to Appwrite storage
      const uploadedFile = await this.bucket.createFile(conf.appwriteBucketId, fileId, file)

      return uploadedFile
    } catch (error) {
      console.error("Appwrite uploadFile service error", error)
      throw error
    }
  }

  async deleteFile(fileId) {
    try {
      if (!fileId) return false

      await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.error("Appwrite deleteFile error", error)
      return false
    }
  }

  getFilePreview(fileId, width = 400, height = 300, quality = 80) {
    try {
      if (!fileId) return "/placeholder.svg?height=300&width=400&text=No+Image"

      const previewUrl = this.bucket.getFilePreview(conf.appwriteBucketId, fileId, width, height, "center", quality)
      return previewUrl.toString()
    } catch (error) {
      console.error("Appwrite getFilePreview error", error)
      return "/placeholder.svg?height=300&width=400&text=Image+Error"
    }
  }

  getFileView(fileId) {
    try {
      if (!fileId) return null

      return this.bucket.getFileView(conf.appwriteBucketId, fileId)
    } catch (error) {
      console.error("Appwrite getFileView error", error)
      return null
    }
  }

  async getFileInfo(fileId) {
    try {
      if (!fileId) return null

      return await this.bucket.getFile(conf.appwriteBucketId, fileId)
    } catch (error) {
      console.error("Appwrite getFileInfo error", error)
      return null
    }
  }
}

const service = new Service()

export default service
