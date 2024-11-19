import { useFetchUsersDataQuery } from "../../../Services/Api/module/users";
import UserFollows from "../../Atoms/UserFollow";

function WhoToFollowBar() {
  const { data } = useFetchUsersDataQuery();

  return (
    <div className="w-full border border-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      {data?.map(({ node: { profilePictureUrl, name, email, id } }, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-4 bg-gray-700 p-3 rounded-lg"
        >
          <div className="flex items-center gap-3 mr-4">
            <img
              src={profilePictureUrl ? profilePictureUrl : ""}
              alt={`${name} profile`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
          <UserFollows followedId={id} />
        </div>
      ))}
      <button className="text-blue-400 hover:text-blue-300 text-sm">
        Show more
      </button>
    </div>
  );
}

export default WhoToFollowBar;
