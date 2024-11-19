import WhoToFollowBar from "../../Components/Molecules/WhoToFollowBar/WhoToFollowBar";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useFetchFollowedUsersQuery } from "../../Services/Api/module/following";
import ShowFollowedUsersPosts from "../../Components/Molecules/ShowFollowedUsersPosts";
import { useEffect, useMemo } from "react";
import { supabase } from "../../Shared/SupabaseClient";

function NewsFeed() {
  const { id } = useSelector((state: RootState) => state.user);
  const { data, refetch } = useFetchFollowedUsersQuery(id);
  const followedUsers = useMemo(() => {
    if (data) {
      return data.map((val) => val.node.followedId);
    }
    return [];
  }, [data]);

  const subscribeToFollowing = () => {
    const channel = supabase
      .channel("public:Following") // Replace with your schema if it's not "public"
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Following" }, // Listen for all events
        (payload) => {
          console.log("Change received! following table", payload);
          refetch();
        }
      )
      .subscribe();
    return channel;
  };

  useEffect(() => {
    const channel = subscribeToFollowing();

    // Cleanup function: Unsubscribe on component unmount
    return () => {
      supabase.removeChannel(channel);
      console.log("Unsubscribed from Posts channel");
    };
  }, []);

  return (
    <div className="flex flex-row justify-between bg-black text-white min-h-screen">
      {/* Main Content */}
      {/* Right Sidebar (Only visible on larger screens, and below on smaller screens) */}
      <div className="md:hidden block ">
        <WhoToFollowBar />
      </div>
      <ShowFollowedUsersPosts followedUsers={followedUsers} />

      {/* Right Sidebar */}
      <div className="flex-1 hidden sm:flex sm:max-w-60 md:max-w-72 lg:max-w-[30%] sticky overflow-y-auto">
        <WhoToFollowBar />
      </div>
    </div>
  );
}

export default NewsFeed;
