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

  const { data } = useCheckIfFollowingUserByIdQuery({
    followerId: id,
    followedId,
  });
  const [unfollow] = useUnfollowMutation();
  const [storeFollowData] = useStoreFollowingDataMutation();
  const handleFollowPressed = () => {
    storeFollowData({ followerId: id, followedId }).then((resp) => {
      console.log("response from adding followers data is ", resp);
    });
  };

  const handleUnfollowPressed = () => {
    unfollow({ followerId: id, followedId }).then((resp) => {
      console.log("response from unfollow is ", resp);
    });
  };
  const handlePress = () => {
    if (data) {
      if (data.length) {
        handleUnfollowPressed();
      } else {
        handleFollowPressed();
      }
    }
  };
  if (!data) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={handlePress}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
    >
      {data.length ? "Unfollow" : "Follow"}
    </button>
  );
}

export default UserFollows;
