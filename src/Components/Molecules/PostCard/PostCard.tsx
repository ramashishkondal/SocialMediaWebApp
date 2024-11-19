import { FaCheckCircle } from "react-icons/fa";
import { PostCardProps } from "./types";

const PostCard = ({
  postImageUrl,
  text,
  userName,
  userPhotoUrl,
}: Readonly<PostCardProps>) => {
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
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold">{userName}</span>
            <FaCheckCircle className="text-blue-500" size={14} />
            <span className="text-gray-400">@PicturesFoIder</span>
            <span className="text-gray-400">· 13h</span>
          </div>
          <p className="text-gray-300">{text}</p>
        </div>
      </div>

      {/* Media Section */}
      {postImageUrl && (
        <div className="my-4">
          <img
            src={postImageUrl}
            placeholder="https://via.placeholder.com/500x300"
            alt="Tweet Media"
            className="rounded-lg border border-gray-700"
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
