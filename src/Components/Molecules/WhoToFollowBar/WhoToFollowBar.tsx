import { useSelector } from "react-redux";
import { useFetchUsersDataQuery } from "../../../Services/Api/module/users";
import UserFollows from "../../Atoms/UserFollow";
import { RootState } from "../../../Store";
import { useState } from "react";

function WhoToFollowBar() {
  const { id } = useSelector((state: RootState) => state.user);
  const [numberOfUsersToShow, setNumberOfUsersToShow] = useState(5);

  // Fetch users data
  const { data, isLoading } = useFetchUsersDataQuery({
    userId: id,
    fetchRecordsUpto: numberOfUsersToShow,
  });

  // Handle "Show more" button click
  const handlePressShowMore = () => {
    setNumberOfUsersToShow((prev) => prev + 3);
  };

  // Check if all users have been shown
  const isShowMoreDisabled = data && data.length < numberOfUsersToShow;

  return (
    <div className="w-full border border-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>

      {/* Loading or empty state */}
      {isLoading ? (
        <div>Loading...</div>
      ) : data && data.length === 0 ? (
        <div>No users to display</div>
      ) : (
        data?.map(
          (
            { node: { profilePictureUrl, name, userName, id: followedId } },
            index
          ) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 bg-gray-700 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3 mr-4">
                <img
                  src={
                    profilePictureUrl
                      ? profilePictureUrl
                      : "https://via.placeholder.com/40"
                  }
                  alt={`${name} profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-400">@{userName}</p>
                </div>
              </div>
              <UserFollows followedId={followedId} />
            </div>
          )
        )
      )}

      {/* Show more button */}
      <button
        type="button"
        onClick={handlePressShowMore}
        className={`text-blue-400 hover:text-blue-300 text-sm ${
          isShowMoreDisabled ? "cursor-not-allowed text-gray-500" : ""
        }`}
        disabled={isShowMoreDisabled}
      >
        {isShowMoreDisabled ? "No more users" : "Show more"}
      </button>
    </div>
  );
}

export default WhoToFollowBar;
