import { useGetAllPostsQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likedByUser,
              likes,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                name={author.name ?? ""}
                authorId={authorId}
                content={content}
                likesCount={likes.length}
                commentsCount={comments.length}
                createdAt={createdAt}
                id={id}
                cardFor="post"
                likedByUser={likedByUser}
              />
            ),
          )
        : null}
    </>
  )
}
