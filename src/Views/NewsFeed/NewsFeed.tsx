import PostCard from "../../Components/Molecules/PostCard";

function NewsFeed() {
  return (
    <div className="bg-red-400 flex flex-1">
      <div>
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}

export default NewsFeed;
