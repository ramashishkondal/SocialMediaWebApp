import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { supabase } from "../../Shared/SupabaseClient";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  const onLogInPressed: MouseEventHandler<HTMLButtonElement> = () => {
    if (email && password) {
      supabase.auth.signInWithPassword({ email, password }).catch((error) => {
        console.log("sign in error", error);
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-start p-8 bg-gray-900 text-gray-300 space-y-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-blue-400">
          Log in to your account
        </h2>

        {/* Form Fields */}
        <form className="space-y-6 w-full">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              onChange={onChangeEmail}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-400 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              onChange={onChangePassword}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-400 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onLogInPressed}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-sm text-center text-gray-400">
          <a href="#" className="hover:text-blue-400 transition">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
