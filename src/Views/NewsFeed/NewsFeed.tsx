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
      <div className="flex-1 hidden sm:flex sm:max-w-60 md:max-w-72 lg:max-w-[30%] sticky overflow-y-auto">
        <WhoToFollowBar />
      </div>
    </div>
  );
}

export default NewsFeed;
