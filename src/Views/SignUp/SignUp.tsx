import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { supabase } from "../../Shared/SupabaseClient";

function SignUp() {
  const [newUserData, setNewUserData] = useState<{
    name: string;
    email: string;
    newPassword: string;
    confirmPassowrd: string;
    dob: string;
  }>({
    name: "",
    email: "",
    newPassword: "",
    confirmPassowrd: "",
    dob: "",
  });

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewUserData({ ...newUserData, name: event.target.value });
  };
  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewUserData({ ...newUserData, email: event.target.value });
  };
  const onChangeNewPassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewUserData({ ...newUserData, newPassword: event.target.value });
  };
  const onChangeConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setNewUserData({ ...newUserData, confirmPassowrd: event.target.value });
  };
  const onChangeDOB: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewUserData({ ...newUserData, dob: event.target.value });
  };

  const onCreateAccountPressed: MouseEventHandler<HTMLButtonElement> = () => {
    if (
      newUserData.name &&
      newUserData.email &&
      newUserData.newPassword &&
      newUserData.dob
    ) {
      supabase.auth
        .signUp({
          email: newUserData.email,
          password: newUserData.newPassword,
          options: {
            data: {
              name: newUserData.name,
              dob: newUserData.dob,
            },
          },
        })
        .catch((error) => {
          console.log("some error ", error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-start p-8 bg-gray-900 text-gray-300 space-y-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-blue-400">
          Create your account
        </h2>

        {/* Form Fields */}
        <form className="space-y-6 w-full">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder=" "
              onChange={onChangeName}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-400 peer-focus:text-sm"
            >
              Name
            </label>
          </div>

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
              id="new-password"
              placeholder=" "
              onChange={onChangeNewPassword}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="new-password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-400 peer-focus:text-sm"
            >
              New Password
            </label>
          </div>
          {/*Confirm Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              onChange={onChangeConfirmPassword}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-blue-400 peer-focus:text-sm"
            >
              Confirm Password
            </label>
          </div>

          {/* Date of Birth */}
          <div className="relative space-y-2">
            <label htmlFor="dob" className="text-white text-md">
              Date of Birth
            </label>
            <p className="text-xs text-gray-400">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <input
              type="date"
              id="dob"
              min="1997-01-01"
              max="2024-12-31"
              onChange={onChangeDOB}
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onCreateAccountPressed}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
