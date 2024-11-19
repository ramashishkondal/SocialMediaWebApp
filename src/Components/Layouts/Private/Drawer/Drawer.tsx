import { Link, useLocation } from "react-router-dom";
import { FaHome, FaNewspaper, FaSignOutAlt } from "react-icons/fa";
import { ROUTES } from "../../../../Shared/Constants";
import { supabase } from "../../../../Shared/SupabaseClient";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store";
import { resetUser } from "../../../../Store/User";
import { setLoading } from "../../../../Store/Loader";
import { updateAuthTokenRedux } from "../../../../Store/Common";

export function Drawer() {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Helper function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  // logOut
  const logOut: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setLoading(true));
    supabase.auth.signOut().then(() => {
      dispatch(resetUser());
      dispatch(updateAuthTokenRedux(null));
      dispatch(setLoading(false));
    });
  };

  return (
    <div
      className={`h-screen flex flex-col bg-black text-white shadow-lg border-r border-gray-700 z-10 sm:w-20 lg:w-[20%]`}
    >
      {/* Menu Items */}
      <nav className="flex flex-col mt-12 space-y-6 px-4 lg:px-6">
        <Link
          to={ROUTES.HOMEPAGE}
          className={`flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 transition ${
            isActive(ROUTES.HOMEPAGE)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaHome size={20} />
          <span className="hidden lg:inline">Home</span>
        </Link>

        <Link
          to={ROUTES.NEWSFEED}
          className={`flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 transition ${
            isActive(ROUTES.NEWSFEED)
              ? "text-blue-400 font-bold"
              : "hover:text-blue-400"
          }`}
        >
          <FaNewspaper size={20} />
          <span className="hidden lg:inline">NewsFeed</span>
        </Link>
        <button
          type="button"
          onClick={logOut}
          className={`flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 transition ${
            isActive("#") ? "text-blue-400 font-bold" : "hover:text-blue-400"
          }`}
        >
          <FaSignOutAlt size={20} />
          <span className="hidden lg:inline">LogOut</span>
        </button>
      </nav>

      <div className="mt-auto">
        {/* Profile Section */}
        <div className="flex items-center justify-center lg:justify-start mt-10 px-4 lg:px-6 py-4 border-t border-gray-700">
          <img
            src={user.profilePictureUrl || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          />
          <div className="ml-4 hidden lg:block">
            <p className="text-sm font-semibold truncate w-full">{user.name}</p>
            <p className="text-xs text-gray-400 truncate w-full">
              @{user.userName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
