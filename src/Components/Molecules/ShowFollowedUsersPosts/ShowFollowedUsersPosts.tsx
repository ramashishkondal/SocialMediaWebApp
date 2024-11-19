import { useEffect } from "react";
import { useFetchPostsDataByFollowedUsersQuery } from "../../../Services/Api/module/posts";
import { supabase } from "../../../Shared/SupabaseClient";
import PostCard from "../PostCard";
import { ShowFollowedUsersPostsProps } from "./types";

function ShowFollowedUsersPosts({
  followedUsers,
}: ShowFollowedUsersPostsProps) {
  const { data, refetch, isSuccess } =
    useFetchPostsDataByFollowedUsersQuery(followedUsers);

  const subscribeToPosts = () => {
    const channel = supabase
      .channel("public:Posts") // Replace with your schema if it's not "public"
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Posts" }, // Listen for all events
        (payload) => {
          console.log("Change received!", payload);
          refetch();
        }
      )
      .subscribe();
    return channel;
  };

  useEffect(() => {
    const channel = subscribeToPosts();

    // Cleanup function: Unsubscribe on component unmount
    return () => {
      supabase.removeChannel(channel);
      console.log("Unsubscribed from Posts channel");
    };
  }, []);

  return (
    <div className=" flex flex-1 flex-col">
      {isSuccess &&
        data?.map((val) => (
          <PostCard
            key={val.node.id}
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
