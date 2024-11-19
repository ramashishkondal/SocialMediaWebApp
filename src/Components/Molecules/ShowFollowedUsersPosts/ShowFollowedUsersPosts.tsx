import { useFetchPostsDataByFollowedUsersQuery } from "../../../Services/Api/module/posts";
import PostCard from "../PostCard";
import { ShowFollowedUsersPostsProps } from "./types";

function ShowFollowedUsersPosts({
  followedUsers,
}: ShowFollowedUsersPostsProps) {
  const { data, isSuccess } =
    useFetchPostsDataByFollowedUsersQuery(followedUsers);

  return (
    <div className=" flex flex-1 flex-col">
      {isSuccess &&
        data?.map((val) => (
          <PostCard
            createdAt={val.node.createdAt}
            key={val.node.id}
            postId={val.node.id}
            postImageUrl={val.node.imageUrl}
            text={val.node.text}
            name={val.node.byUser.name}
            userName={val.node.byUser.userName}
            userPhotoUrl={val.node.byUser.profilePictureUrl}
          />
        ))}
    </div>
  );
}

export default ShowFollowedUsersPosts;
