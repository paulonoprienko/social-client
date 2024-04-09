import { api } from "./api"

const FollowsApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<{ message: string }, { followingId: string }>({
      query: body => ({
        url: "follow",
        method: "POST",
        body,
      }),
    }),
    unfollowUser: builder.mutation<
      { message: string },
      { followingId: string }
    >({
      query: followingId => ({
        url: `follow/${followingId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = FollowsApi

export const {
  endpoints: { followUser, unfollowUser },
} = FollowsApi
