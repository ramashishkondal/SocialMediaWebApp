import WhoToFollowBar from "../../Components/Molecules/WhoToFollowBar/WhoToFollowBar";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useFetchFollowedUsersQuery } from "../../Services/Api/module/following";
import ShowFollowedUsersPosts from "../../Components/Molecules/ShowFollowedUsersPosts";
import { useMemo } from "react";

function NewsFeed() {
  const { id } = useSelector((state: RootState) => state.user);
  const { data } = useFetchFollowedUsersQuery(id);
  const followedUsers = useMemo(() => {
    if (data) {
      return data.map((val) => val.node.followedId);
    }
    return [];
  }, [data]);

  return (
    <div className="flex flex-row justify-between bg-black text-white min-h-screen">
      {/* Main Content */}
      <ShowFollowedUsersPosts followedUsers={followedUsers} />

      {/* Right Sidebar */}
      <div className="flex flex-1 max-w-96 sticky overflow-y-auto h-screen">
        <WhoToFollowBar />
      </div>
    </div>
  );
}

export default NewsFeed;
