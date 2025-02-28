import React, { useState } from "react";
import { Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-white z-1 dark:bg-gray-900">
      <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
        <div className="w-full max-w-md pt-5 mx-auto sm:py-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg
              className="stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to dashboard
          </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto p-4">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              LOGIN
            </h1>
          </div>

          {/* <!-- By Google --> */}
          <div className="flex justify-center mb-5 p-4">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse?.credential || '');
                console.log(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          {/* <!-- Email --> */}
          <div className="mb-4 p-4">
            <Label>
              Email<span className="text-error-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          {/* <!-- Password --> */}
          <div className="mb-4 p-4">
            <Label>
              Password<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </span>
            </div>
          </div>
          {/* <!-- Checkbox --> */}
          <div className="flex items-center gap-3 mb-4 p-4">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={setIsChecked}
            />
            <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
              By creating an account means you agree to the{" "}
              <span className="text-gray-800 dark:text-white/90">
                Terms and Conditions,
              </span>{" "}
              and our{" "}
              <span className="text-gray-800 dark:text-white">
                Privacy Policy
              </span>
            </p>
          </div>
          <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
            Login with Guest
          </button>
        </div>
      </div>
      <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        <GridShape />
        {/* <!-- ===== Common Grid Shape End ===== --> */}
        <div className="flex flex-col items-center max-w-xs">
          <Link to="" className="block mb-4">
            <img src="./images/logo/auth-logo.svg" alt="Logo" />
          </Link>
          <p className="text-center text-gray-400 dark:text-white/60">
            Welcome to Billiard Club
          </p>
        </div>
      </div>
    </div>
  );
}
