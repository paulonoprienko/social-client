import { useEffect } from "react"
import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followsApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddDisabled,
  MdOutlinePersonAddAlt1,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import { EditProfile } from "../../components/edit-profile"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data: user } = useGetUserByIdQuery({ id: id ?? "" })
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrent] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (!id) return
      if (user?.isFollowing) {
        await unfollowUser({ followingId: id }).unwrap()
      } else {
        await followUser({ followingId: id }).unwrap()
      }
      await triggerUserById({ id: user?.id ?? "" })
      await triggerCurrent()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerUserById({ id: user?.id ?? "" })
        await triggerCurrent()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return null
  }

  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${user.avatarUrl}`}
            alt={`${user.name}`}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {user.name}
            {currentUser?.id !== id ? (
              <Button
                color={user.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  user.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {user.isFollowing ? "Describe" : "Subscribe"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={onOpen}>
                Edit
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Email" info={user.email} />
          <ProfileInfo title="Location" info={user.location} />
          <ProfileInfo
            title="Date of birth"
            info={formatToClientDate(user.dateOfBirth)}
          />
          <ProfileInfo title="About" info={user.bio} />

          <div className="flex gap-2">
            <CountInfo count={user.followers.length} title="Followers" />
            <CountInfo count={user.following.length} title="Following" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={user} />
    </>
  )
}
