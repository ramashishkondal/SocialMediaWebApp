import { useFetchPostsDataByFollowedUsersQuery } from "../../../Services/Api/module/posts";
import PostCard from "../PostCard";
import { ShowFollowedUsersPostsProps } from "./types";

function ShowFollowedUsersPosts({
  followedUsers,
}: ShowFollowedUsersPostsProps) {
  const { data, isSuccess } =
    useFetchPostsDataByFollowedUsersQuery(followedUsers);
  if (followedUsers.length === 0 || data?.length === 0) {
    return (
      <div className="text-center mt-4 shadow-lg max-w-md mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-xl font-semibold mb-4">
            Follow people now to show their posts on your feed.
          </p>
          <p className="text-gray-400 text-sm">
            Once you follow someone, their posts will appear here.
          </p>
        </div>
      </div>
    );
  }
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
