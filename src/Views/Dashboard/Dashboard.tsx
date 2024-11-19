import { useNavigate } from "react-router-dom";
import { ROUTES_CONFIG } from "../../Shared/Constants";
import { MouseEventHandler } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const goToSignUp: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(ROUTES_CONFIG.SIGNUP.path);
  };
  const goToLogIn: MouseEventHandler<HTMLButtonElement> = () => {
    navigate(ROUTES_CONFIG.LOGIN.path);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center justify-center">
      {/* Content Wrapper */}
      <div className="container mx-auto flex flex-1 flex-col md:flex-row items-center justify-between h-screen w-full px-4 md:px-12 space-y-8 md:space-y-0">
        {/* Left Section: Logo and Title */}
        <div className="flex flex-col items-start  space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
              <path d="M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm4.5 0c0 4.1-3.4 7.5-7.5 7.5S4 16.1 4 12s3.4-7.5 7.5-7.5S19 7.9 19 12z" />
            </svg>
            <span className="text-3xl font-bold tracking-wide text-blue-400">
              SocialConnect
            </span>
          </div>
          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight">
            Happening Now
          </h1>
          <p className="text-lg text-gray-400">
            Join today and connect with people everywhere.
          </p>
        </div>

        {/* Right Section: Sign Up and Log In */}
        <div className="flex flex-col items-start space-y-8 w-full md:w-1/2">
          {/* Welcome Text */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-blue-400">
              Welcome to SocialConnect
            </h2>
            <p className="text-gray-400 text-base">
              Sign up today to discover, share, and connect with people from
              around the world!
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="w-3/4 h-px bg-gray-600"></div>

          {/* Features List */}
          <div className="space-y-3 text-base text-gray-300">
            <p>✔️ Create your personalized profile</p>
            <p>✔️ Stay updated with your favorite topics</p>
            <p>✔️ Connect with friends and communities</p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col space-y-4 w-full">
            <button
              type="button"
              onClick={goToSignUp}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-10 rounded-full text-xl font-semibold shadow-lg transition w-full md:w-auto"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={goToLogIn}
              className="border mb-4 border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white py-4 px-10 rounded-full text-xl font-semibold shadow-lg transition w-full md:w-auto"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
