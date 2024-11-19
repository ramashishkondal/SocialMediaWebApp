import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { supabase } from "../../Shared/SupabaseClient";
import CustomTextField from "../../Components/Molecules/CustomTextField";
import { isNotValidEmail } from "../../Utils/checkValidity";
import { useDispatch } from "react-redux";
import { FaLeftLong } from "react-icons/fa6";
import { setLoading } from "../../Store/Loader";
import { toast } from "react-toastify"; // Import Toastify

// Make sure to include the ToastContainer at the root of your app (in App.tsx or similar)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import { updateAuthTokenRedux } from "../../Store/Common";

function LogIn() {
  const [email, setEmail] = useState("");
  const [isEmailVisited, setIsEmailVisited] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Initialize the navigation function

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  const onBlurEmail: FocusEventHandler<HTMLInputElement> = () => {
    setIsEmailVisited(true);
  };

  const onLogInPressed: MouseEventHandler<HTMLButtonElement> = () => {
    if (email && password) {
      dispatch(setLoading(true));
      supabase.auth
        .signInWithPassword({ email, password })
        .then(({ data: { session } }) => {
          dispatch(updateAuthTokenRedux(session));
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log("sign in error", error);
          if (error.message === "Invalid login credentials") {
            toast.error("Invalid email or password!");
          } else {
            toast.error("An error occurred. Please try again.");
          }
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      toast.error("Please enter both email and password.");
    }
  };

  const onBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <div className="flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 justify-center min-h-screen">
        <div className="flex flex-col items-start p-8 bg-gray-900 text-gray-300 space-y-8 rounded-lg shadow-xl w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={onBackToHome}
            className="text-blue-400 hover:text-blue-500 transition self-start"
          >
            <FaLeftLong />
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-blue-400">
            Log in to your account
          </h2>

          {/* Form Fields */}
          <form className="space-y-6 w-full" autoComplete="off">
            {/* Email */}
            <CustomTextField
              id="email"
              value={email}
              onChange={onChangeEmail}
              errorText="Please enter a valid email address."
              labelText="Email"
              onBlur={onBlurEmail}
              showError={isNotValidEmail(email) && isEmailVisited && !!email}
            />

            {/* Password */}
            <CustomTextField
              id="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              errorText="Please enter your password."
              labelText="Password"
              onBlur={onBlurEmail}
              showError={false}
            />

            {/* Submit Button */}
            <button
              type="button"
              onClick={onLogInPressed}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* ToastContainer to display the toast messages */}
      <ToastContainer />
    </>
  );
}

export default LogIn;
