import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client); //bucket is also called as storage
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      //console.log(title, slug, content, featuredImage, status, userId);
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePosy :: error", error);
      return false;
    }
  }

  async getDocumentById(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: Unable to fetch the Document", error);
      return true;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    //we are fetching blogs from dataase which are active in status using queries// similar to pipelining in MongoDB
    //you can only use Queries, if you have created indexes, we did for status
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
        // [//write queries directly in the array
        //     Query.equal("status", "active")
        // ]
        //you can also give pagination here
      );
    } catch (error) {
      console.log("Appwrite Service :: Unable to fetch the Documents", error);
      return false;
    }
  }

  //file uploading
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: Unable to delete the file", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
