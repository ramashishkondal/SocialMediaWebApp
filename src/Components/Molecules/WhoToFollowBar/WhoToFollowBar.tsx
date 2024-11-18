import { useFetchUsersDataQuery } from "../../../Services/Api/module/users";

function WhoToFollowBar() {
  const { data } = useFetchUsersDataQuery();

  return (
    <div className="w-full border border-gray-800 p-4">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      {data?.map(({ node: { profilePictureUrl, name, email } }, index) => (
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            Follow
          </button>
        </div>
      ))}
      <button className="text-blue-400 hover:text-blue-300 text-sm">
        Show more
      </button>
    </div>
  );
}

export default WhoToFollowBar;
