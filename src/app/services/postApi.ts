import { type Post } from "../types"
import { api } from "./api"

export const PostApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: postData => ({
        url: "posts",
        method: "POST",
        body: postData,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "posts",
        method: "GET",
      }),
    }),
    getPostById: builder.query<Post, { id: string }>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "GET",
      }),
    }),
    deletePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
} = PostApi

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = PostApi
