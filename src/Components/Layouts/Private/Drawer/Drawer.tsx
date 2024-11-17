import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaBookmark,
  FaUsers,
  FaEllipsisH,
  FaPlus,
  FaNewspaper,
} from "react-icons/fa";
import { ROUTES } from "../../../../Shared/Constants";

export function Drawer() {
  return (
    <div
      className={`h-screen flex flex-col bg-black text-white shadow-lg w-72 border-r border-white z-50`}
    >
      {/* Menu Items */}
      <nav className="flex flex-col mt-12 space-y-6 px-6">
        <Link
          to={ROUTES.HOMEPAGE}
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaSearch size={20} />
          <span>Explore</span>
        </Link>
        <Link
          to={ROUTES.NEWSFEED}
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaNewspaper size={20} />
          <span>NewsFeed</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaBell size={20} />
          <span>Notifications</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaEnvelope size={20} />
          <span>Messages</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaBookmark size={20} />
          <span>Bookmarks</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaUsers size={20} />
          <span>Communities</span>
        </Link>
        <Link
          to="#"
          className="flex items-center space-x-4 hover:text-blue-400 transition"
        >
          <FaUser size={20} />
          <span>Profile</span>
        </Link>
      </nav>
      <div className="mt-auto">
        {/* Post Button */}
        <div className="px-6">
          <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center space-x-2 transition">
            <FaPlus />
            <span>Post</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center mt-10 px-6 py-4 border-t border-gray-700">
          <img
            src="https://via.placeholder.com/40" // Placeholder avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <p className="text-sm font-semibold">Aman Yadav</p>
            <p className="text-xs text-gray-400">@pancake_ken</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-100 transition">
            <FaEllipsisH />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
