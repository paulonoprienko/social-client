import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"
import { selectCurrent } from "../../features/user/userSlice"

export const Following = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(follow => (
        <Link to={`/users/${follow.following.id}`} key={follow.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={follow.following.name ?? ""}
                avatarUrl={follow.following.avatarUrl ?? ""}
                description={follow.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>You haven't followed anyone yet</h2>
  )
}
