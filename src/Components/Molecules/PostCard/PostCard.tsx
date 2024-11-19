import { FaCheckCircle } from "react-icons/fa";
import { PostCardProps } from "./types";
import { useFetchTagsByPostIdQuery } from "../../../Services/Api/module/postsTags";
import { getTimePassed } from "../../../Utils/commonFuncs";

const PostCard = ({
  postId,
  postImageUrl,
  name,
  text,
  userName,
  userPhotoUrl,
  createdAt,
}: Readonly<PostCardProps>) => {
  const { data: taggedUsers } = useFetchTagsByPostIdQuery(postId);

  return (
    <div className="flex flex-col bg-black text-white p-4 w-full border border-gray-700 shadow-md">
      {/* Header Section */}
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <img
          src={userPhotoUrl ? userPhotoUrl : "https://via.placeholder.com/40"}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        {/* User Info */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span
              className="font-semibold truncate max-w-[8rem] lg:max-w-[12rem]"
              title={name} // Tooltip for full name
            >
              {name}
            </span>
            <FaCheckCircle className="text-blue-500" size={14} />
            <span
              className="text-gray-400 truncate max-w-[6rem] lg:max-w-[10rem]"
              title={`@${userName}`} // Tooltip for full username
            >
              @{userName}
            </span>
            <span className="text-gray-400">
              · {getTimePassed(new Date(createdAt))}
            </span>
          </div>
          <p className="text-gray-300 break-words">{text}</p>
        </div>
      </div>

      {/* Media Section */}
      {postImageUrl && (
        <div className="my-4">
          <img
            src={postImageUrl}
            alt="Post Media"
            className="rounded-lg border border-gray-700 max-h-96 object-cover"
          />
        </div>
      )}

      {/* Tagged Users Section */}
      {taggedUsers && taggedUsers.length > 0 && (
        <div className="mt-2 border bg-gray-600 rounded-lg px-2 py-2">
          <h3 className="text-gray-300 text-sm font-semibold">Tagged Users:</h3>
          <div className="flex space-x-3 overflow-x-auto mt-2">
            {taggedUsers.map(({ node: user }) => (
              <div key={user.id} className="flex items-center space-x-2">
                <img
                  src={
                    user.users.profilePictureUrl ||
                    "https://via.placeholder.com/40"
                  }
                  alt={user.userName}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span
                    className="text-sm font-medium text-gray-300"
                    title={user.users.name}
                  >
                    {user.users.name}
                  </span>
                  <span
                    className="text-xs text-gray-400"
                    title={`@${user.userName}`}
                  >
                    @{user.userName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
