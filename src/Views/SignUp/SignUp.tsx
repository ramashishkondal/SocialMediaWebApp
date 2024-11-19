import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { supabase } from "../../Shared/SupabaseClient";
import { isNotValidEmail, isNotValidName } from "../../Utils/checkValidity";
import CustomTextField from "../../Components/Molecules/CustomTextField";
import { useStoreUserDataMutation } from "../../Services/Api/module/users";
import { AuthResponse } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

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
  const navigate = useNavigate(); // Initialize the navigation function

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [fieldsVisited, setFieldsVisited] = useState({
    nameVisited: false,
    emailVisited: false,
    newPasswordVisited: false,
    confirmPasswordVisited: false,
  });

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
    navigate("/"); // Navigate to the home page
  };

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

  const onBlurName: FocusEventHandler = () => {
    setFieldsVisited({ ...fieldsVisited, nameVisited: true });
  };
  const onBlurEmail: FocusEventHandler = () => {
    setFieldsVisited({ ...fieldsVisited, emailVisited: true });
  };
  const onBlurNewPassowrd: FocusEventHandler = () => {
    setFieldsVisited({ ...fieldsVisited, newPasswordVisited: true });
  };
  const onBlurConfirmPassowrd: FocusEventHandler = () => {
    setFieldsVisited({ ...fieldsVisited, confirmPasswordVisited: true });
  };

  const onCreateAccountPressed: MouseEventHandler<HTMLButtonElement> = () => {
    if (
      newUserData.name &&
      newUserData.email &&
      newUserData.newPassword &&
      newUserData.dob
    ) {
      const createUserAccount = async () => {
        try {
          const {
            data: { user },
          }: AuthResponse = await supabase.auth.signUp({
            email: newUserData.email,
            password: newUserData.newPassword,
            options: {
              emailRedirectTo: undefined,
              data: {
                name: newUserData.name,
                dob: newUserData.dob,
              },
            },
          });

          if (!user) {
            console.log("user null received");
            return;
          }

          let profilePictureUrl = null;
          if (profilePicture) {
            const filePath = `profiles/${user.id}/${profilePicture.name}`;
            const { error: uploadError } = await supabase.storage
              .from("SocialMediaImages")
              .upload(filePath, profilePicture);

            if (!uploadError) {
              profilePictureUrl = supabase.storage
                .from("SocialMediaImages")
                .getPublicUrl(filePath).data.publicUrl;
            }
          }

          const resp = await storeUser({
            id: user.id,
            dob: newUserData.dob,
            email: newUserData.email,
            name: newUserData.name,
            profilePictureUrl,
          });

          console.log("storing resp is ", resp);
        } catch (e) {
          console.log("Error during account creation:", e);
        }
      };
      createUserAccount();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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
          Create your account
        </h2>

        {/* Profile Picture */}
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

        {/* Form Fields */}
        <form className="space-y-3 w-full" autoComplete="off">
          {/* Name */}
          <CustomTextField
            id="name"
            onChange={onChangeName}
            onBlur={onBlurName}
            labelText="Name"
            errorText="Please enter a valid name."
            showError={
              isNotValidName(newUserData.name) && fieldsVisited.nameVisited
            }
            value={newUserData.name}
          />

          {/* Email */}
          <CustomTextField
            id="email"
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            labelText="Email"
            errorText="Please enter a valid email."
            showError={
              isNotValidEmail(newUserData.email) &&
              fieldsVisited.emailVisited &&
              !!newUserData.email
            }
            value={newUserData.email}
          />

          {/* New Password */}
          <CustomTextField
            id="newPassword"
            onChange={onChangeNewPassword}
            onBlur={onBlurNewPassowrd}
            labelText="New Password"
            errorText="Please enter a valid password."
            showError={false}
            value={newUserData.newPassword}
          />

          {/*Confirm Password */}
          <CustomTextField
            id="confirmPassword"
            onChange={onChangeConfirmPassword}
            onBlur={onBlurConfirmPassowrd}
            labelText="Confirm Password"
            errorText="Passwords dont match."
            showError={
              newUserData.confirmPassowrd !== newUserData.newPassword &&
              fieldsVisited.confirmPasswordVisited &&
              !!newUserData.newPassword
            }
            value={newUserData.confirmPassowrd}
          />

          {/* Date of Birth */}
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
