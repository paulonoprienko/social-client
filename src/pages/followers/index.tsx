import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"

export const Followers = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(follow => (
        <Link to={`/users/${follow.follower.id}`} key={follow.follower.id}>
          <Card>
            <CardBody className="block">
              <User
                name={follow.follower.name ?? ""}
                avatarUrl={follow.follower.avatarUrl ?? ""}
                description={follow.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>You have no followers yet</h2>
  )
}
