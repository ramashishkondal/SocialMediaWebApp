import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaUser,
  FaBookmark,
  FaUsers,
  FaPlus,
  FaNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";
import { ROUTES } from "../../../../Shared/Constants";
import { supabase } from "../../../../Shared/SupabaseClient";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store";
import { resetUser } from "../../../../Store/User";
import { setLoading } from "../../../../Store/Loader";

export function Drawer() {
  const location = useLocation(); // Get the current location
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Helper function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  // logOut
  const logOut: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setLoading(true));
    supabase.auth.signOut().finally(() => {
      dispatch(resetUser());
      dispatch(setLoading(false));
    });
  };

  return (
    <div
      className={`h-screen flex flex-col bg-black text-white shadow-lg w-96 border-r border-gray-700 z-10`}
    >
      {/* Menu Items */}
      <nav className="flex flex-col mt-12 space-y-6 px-6">
        <Link
          to={ROUTES.HOMEPAGE}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.HOMEPAGE)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>
        <Link
          to={ROUTES.EXPLORE}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.EXPLORE)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaSearch size={20} />
          <span>Explore</span>
        </Link>
        <Link
          to={ROUTES.NEWSFEED}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.NEWSFEED)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaNewspaper size={20} />
          <span>NewsFeed</span>
        </Link>

        <Link
          to={ROUTES.BOOKMARKS}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.BOOKMARKS)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaBookmark size={20} />
          <span>Bookmarks</span>
        </Link>
        <Link
          to={ROUTES.COMMUNITY}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.COMMUNITY)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaUsers size={20} />
          <span>Communities</span>
        </Link>
        <Link
          to={ROUTES.PROFILE}
          className={`flex items-center space-x-4 transition ${
            isActive(ROUTES.PROFILE)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaUser size={20} />
          <span>Profile</span>
        </Link>
        <button
          type="button"
          onClick={logOut}
          className={`flex items-center space-x-4 transition ${
            isActive("#") ? "text-blue-400 font-bold" : "hover:text-blue-400"
          }`}
        >
          <FaSignOutAlt size={20} />
          <span>LogOut</span>
        </button>
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
            src={user.profilePictureUrl!}
            placeholder="https://via.placeholder.com/40" // Placeholder avatar
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-400">@pancake_ken</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
