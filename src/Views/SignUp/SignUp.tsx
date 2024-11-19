import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { supabase } from "../../Shared/SupabaseClient";
import { isNotValidEmail, isNotValidName } from "../../Utils/checkValidity";
import CustomTextField from "../../Components/Molecules/CustomTextField";
import {
  useLazyFetchUserDataByUserNameQuery,
  useStoreUserDataMutation,
} from "../../Services/Api/module/users";
import { AuthResponse } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [newUserData, setNewUserData] = useState({
    name: "",
    userName: "",
    email: "",
    newPassword: "",
    confirmPassowrd: "",
    dob: "",
  });

  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [fieldsVisited, setFieldsVisited] = useState({
    nameVisited: false,
    usernameVisited: false,
    emailVisited: false,
    newPasswordVisited: false,
    confirmPasswordVisited: false,
  });

  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // Loading state
  const [checkUserName] = useLazyFetchUserDataByUserNameQuery();

  const [storeUser] = useStoreUserDataMutation();

  const handleProfilePictureChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const onBackToHome = () => {
    navigate("/");
  };

  const isFormValid = () => {
    return (
      newUserData.name &&
      newUserData.userName &&
      newUserData.email &&
      newUserData.newPassword &&
      newUserData.newPassword === newUserData.confirmPassowrd &&
      !isNotValidName(newUserData.name) &&
      !isNotValidEmail(newUserData.email)
    );
  };

  const onCreateAccountPressed: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setIsCreatingAccount(true);
    try {
      const userWithUserName = await checkUserName(newUserData.userName);

      if (userWithUserName.data && userWithUserName.data.length !== 0) {
        toast.error(
          "Username has already been taken. Please try some other username."
        );
        return;
      }
      const {
        data: { user },
        error,
      }: AuthResponse = await supabase.auth.signUp({
        email: newUserData.email,
        password: newUserData.newPassword,
        options: {
          emailRedirectTo: undefined,
          data: {
            name: newUserData.name,
            username: newUserData.userName,
            dob: newUserData.dob,
          },
        },
      });

      if (!user) {
        toast.error(
          "Unable to create user. Please try again." + error?.message
        );
        setIsCreatingAccount(false);
        return;
      }

      let profilePictureUrl = null;
      if (profilePicture) {
        const filePath = `profiles/${user.id}/${profilePicture.name}`;
        const { error: uploadError } = await supabase.storage
          .from("SocialMediaImages")
          .upload(filePath, profilePicture);

        if (uploadError) {
          toast.error("Error uploading profile picture.");
        } else {
          profilePictureUrl = supabase.storage
            .from("SocialMediaImages")
            .getPublicUrl(filePath).data.publicUrl;
        }
      }

      await storeUser({
        id: user.id,
        dob: newUserData.dob,
        email: newUserData.email,
        name: newUserData.name,
        userName: newUserData.userName,
        profilePictureUrl,
      });
    } catch (e) {
      console.error(e);
      toast.error("Error during account creation. Please try again.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-start p-8 bg-gray-900 text-gray-300 space-y-8 rounded-lg shadow-xl w-full max-w-md">
        <button
          onClick={onBackToHome}
          className="text-blue-400 hover:text-blue-500 transition self-start"
        >
          <FaLeftLong />
        </button>

        <h2 className="text-3xl font-semibold text-blue-400">
          Create your account
        </h2>

        <div>
          <label className="block text-sm font-medium text-white">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-2 text-gray-300"
          />
          {profilePicturePreview && (
            <img
              src={profilePicturePreview}
              alt="Preview"
              className="mt-3 rounded-full w-32 h-32 object-cover"
            />
          )}
        </div>

        <form className="space-y-3 w-full" autoComplete="off">
          <CustomTextField
            id="name"
            onChange={(e) =>
              setNewUserData({ ...newUserData, name: e.target.value })
            }
            onBlur={() =>
              setFieldsVisited({ ...fieldsVisited, nameVisited: true })
            }
            labelText="Name"
            errorText="Please enter a valid name."
            showError={
              isNotValidName(newUserData.name) && fieldsVisited.nameVisited
            }
            value={newUserData.name}
          />

          <CustomTextField
            id="username"
            onChange={(e) =>
              setNewUserData({ ...newUserData, userName: e.target.value })
            }
            onBlur={() =>
              setFieldsVisited({ ...fieldsVisited, usernameVisited: true })
            }
            labelText="Username"
            errorText="Username must be at least 3 characters long."
            showError={
              newUserData.userName.length < 3 && fieldsVisited.usernameVisited
            }
            value={newUserData.userName}
          />

          <CustomTextField
            id="email"
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
            onBlur={() =>
              setFieldsVisited({ ...fieldsVisited, emailVisited: true })
            }
            labelText="Email"
            errorText="Please enter a valid email."
            showError={
              isNotValidEmail(newUserData.email) &&
              fieldsVisited.emailVisited &&
              !!newUserData.email
            }
            value={newUserData.email}
          />

          <CustomTextField
            isSensitive={true}
            id="newPassword"
            onChange={(e) =>
              setNewUserData({ ...newUserData, newPassword: e.target.value })
            }
            onBlur={() =>
              setFieldsVisited({ ...fieldsVisited, newPasswordVisited: true })
            }
            labelText="New Password"
            errorText="Please enter a valid password."
            showError={false}
            value={newUserData.newPassword}
          />

          <CustomTextField
            isSensitive={true}
            id="confirmPassword"
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                confirmPassowrd: e.target.value,
              })
            }
            onBlur={() =>
              setFieldsVisited({
                ...fieldsVisited,
                confirmPasswordVisited: true,
              })
            }
            labelText="Confirm Password"
            errorText="Passwords don't match."
            showError={
              newUserData.confirmPassowrd !== newUserData.newPassword &&
              fieldsVisited.confirmPasswordVisited &&
              !!newUserData.newPassword
            }
            value={newUserData.confirmPassowrd}
          />

          <div className="relative space-y-3">
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
              onChange={(e) =>
                setNewUserData({ ...newUserData, dob: e.target.value })
              }
              className="peer w-full px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={onCreateAccountPressed}
            disabled={!isFormValid() || isCreatingAccount}
            className={`w-full py-3 ${
              !isFormValid() || isCreatingAccount
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-md transition`}
          >
            {isCreatingAccount ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
