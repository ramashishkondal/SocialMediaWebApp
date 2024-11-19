import { useState } from "react";
import { CustomTextFieldProps } from "./types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CustomTextField({
  onChange,
  value,
  onBlur,
  labelText,
  errorText,
  showError,
  isSensitive = false,
  id,
}: CustomTextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative py-2">
      <input
        type={isSensitive && !isPasswordVisible ? "password" : "text"}
        id={id ? id : labelText}
        value={value}
        placeholder=" "
        onChange={onChange}
        onBlur={onBlur}
        className={`peer w-full px-4 py-3 my-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out ${
          showError
            ? "border-red-400 focus:border-red-400 focus:ring-red-400"
            : "focus:border-blue-500 focus:ring-blue-500"
        }`}
      />
      <label
        htmlFor={id ? id : labelText}
        className={`absolute left-4 top-3 text-gray-500 text-sm transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-0 bg-gray-800 px-2 rounded-md peer-focus:text-blue-400 peer-focus:text-sm ${
          value ? "-top-[-2px] text-blue-400 text-sm " : ""
        }`}
      >
        {labelText}
      </label>
      {isSensitive && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-7 text-gray-500 hover:text-gray-300 focus:outline-none"
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {showError ? (
        <div className="text-red-400 pl-4 pt-1 text-sm transition-all duration-300 ease-in-out">
          {errorText}
        </div>
      ) : null}
    </div>
  );
}

export default CustomTextField;
