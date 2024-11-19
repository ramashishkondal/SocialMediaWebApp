import { useSelector } from "react-redux";
import {
  useCheckIfFollowingUserByIdQuery,
  useStoreFollowingDataMutation,
  useUnfollowMutation,
} from "../../../Services/Api/module/following";
import { RootState } from "../../../Store";
import { UserFollowsProps } from "./types";

function UserFollows({ followedId }: UserFollowsProps) {
  const { id } = useSelector((state: RootState) => state.user);

  const { data, isLoading, refetch, isFetching } =
    useCheckIfFollowingUserByIdQuery({
      followerId: id,
      followedId,
    });
  const [unfollow] = useUnfollowMutation();
  const [storeFollowData] = useStoreFollowingDataMutation();

  const handleFollowPressed = async () => {
    try {
      const response = await storeFollowData({ followerId: id, followedId });
      console.log("response from adding followers data is ", response);
    } catch (error) {
      console.error("Error while following: ", error);
    }
  };

  const handleUnfollowPressed = async () => {
    try {
      const response = await unfollow({ followerId: id, followedId });
      console.log("response from unfollow is ", response);
    } catch (error) {
      console.error("Error while unfollowing: ", error);
    }
  };

  const handlePress = async () => {
    if (!data || !Array.isArray(data)) return; // Add validation to ensure data is an array

    if (data.length > 0) {
      await handleUnfollowPressed(); // Unfollow if already following
    } else {
      await handleFollowPressed(); // Follow if not following
    }
    refetch();
  };

  if (isLoading) {
    return (
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
        disabled
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={isFetching}
      onClick={handlePress}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
    >
      {data && data.length > 0 ? "Unfollow" : "Follow"}
    </button>
  );
}

export default UserFollows;
