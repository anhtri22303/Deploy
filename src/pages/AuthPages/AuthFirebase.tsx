import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/Auth_Firebase/firebase";
import SignInwithGoogle from "../../components/Auth_Firebase/signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-gray-900 z-1 dark:bg-gray-900">
      <div className="flex flex-col flex-1 p-4 rounded-2xl sm:rounded-none sm:border-0 sm:p-6">
        <div className="w-full max-w-md pt-5 mx-auto sm:py-8">
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
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto p-2">
          <div className="mb-4 sm:mb-6 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              LOGIN
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email<span className="text-error-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 p-2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password<span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
                  onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex items-center gap-2 mb-3 p-2">
              <Checkbox
                className="w-4 h-4"
                checked={isChecked}
                onChange={setIsChecked}
              />
              <p className="inline-block font-normal text-gray-500 dark:text-gray-400 text-xs">
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
            <div className="mb-3">
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
            <p className="text-sm text-right text-gray-600">
              New user{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register Here
              </a>
            </p>
            <div className="mt-3">
              <SignInwithGoogle />
            </div>
          </form>
        </div>
      </div>
      <div className="relative items-center justify-center flex-1 hidden p-6 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
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

export default Login;