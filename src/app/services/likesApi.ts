import { type Like } from "../types"
import { api } from "./api"

const LikesApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "likes",
        method: "POST",
        body,
      }),
    }),
    unlikePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `likes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = LikesApi

export const {
  endpoints: { likePost, unlikePost },
} = LikesApi
