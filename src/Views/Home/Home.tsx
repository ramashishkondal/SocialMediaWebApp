import { useEffect, useState } from "react";
import PostCard from "../../Components/Molecules/PostCard";
import PostComposer from "../../Components/Molecules/PostComposer";
import { useFetchPostsDataByTimeQuery } from "../../Services/Api/module/posts";
import { supabase } from "../../Shared/SupabaseClient";
import WhoToFollowBar from "../../Components/Molecules/WhoToFollowBar/WhoToFollowBar";
import { getTimePassed } from "../../Utils/commonFuncs";

function Home() {
  const [numberOfPosts, _setNumberOfPosts] = useState(5);

  const {
    data: postsData,
    isSuccess,
    refetch,
  } = useFetchPostsDataByTimeQuery(numberOfPosts);

  console.log("pp", postsData);

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
    <div className="flex flex-row justify-between bg-black text-white min-h-screen">
      {/* Main Content */}
      <div className=" flex flex-1 flex-col">
        <PostComposer />
        {isSuccess &&
          postsData?.map((val) => (
            <PostCard
              name={val.node.byUser.name}
              key={val.node.id}
              postImageUrl={val.node.imageUrl}
              text={val.node.text}
              userName={val.node.byUser.userName}
              userPhotoUrl={val.node.byUser.profilePictureUrl}
            />
          ))}
      </div>

      {/* Right Sidebar */}
      <div className="flex-1 hidden sm:flex sm:max-w-60 md:max-w-72 lg:max-w-[30%] sticky overflow-y-auto ">
        <WhoToFollowBar />
      </div>
    </div>
  );
}

export default Home;
