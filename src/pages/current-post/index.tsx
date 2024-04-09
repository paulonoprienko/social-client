import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postApi"
import { Card } from "../../components/card"
import { GoBack } from "../../components/go-back"
import { CreateComment } from "../../components/create-comment"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery({ id: params.id ?? "" })

  if (!data) {
    return <h2>Post doesn't exists</h2>
  }

  const {
    id,
    content,
    author,
    authorId,
    likes,
    comments,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                key={comment.id}
                cardFor="comment"
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
              />
            ))
          : null}
      </div>
    </>
  )
}
