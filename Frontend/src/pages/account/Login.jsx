// import React from 'react'

import { logo } from "../..";
const Login = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center min-h-[60vh] max-h-max w-full">
          <div className="bg-white my-5 rounded-md md:p-6 p-3 shadow-lg shadow-gray-500 border md:min-w-[60%] lg:min-w-[50%] xl:min-w-[30%] min-w-[90%]">
            <div className="md:-mt-6 md:pb-6 pb-3 -mt-3">
              <div className="flex items-center justify-center gap-2">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full max-h-20 max-w-20"
                />
                <h1 className="-ml-6 text-2xl font-bold">Login</h1>
              </div>
            </div>
            <div className="">
              <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="md:font-medium font-normal">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="password"
                    className="md:font-medium font-normal"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2"
                  />
                </div>
                <div className="md:flex flex-col md:flex-row justify-between ">
                  <div className="flex gap-2 mb-2 md:mb-0">
                    <input
                      type="checkbox"
                      id="remember"
                      className="accent-buttonColor size-4 mt-1 cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="md:font-medium font-normal"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <h1 className="text-cardHoverColor hover:underline cursor-pointer font-medium">
                      Forgot Password?
                    </h1>
                  </div>
                </div>
                <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                  <div className=" md:w-[40%] mb-2 md:mb-0">
                    <button
                      type="submit"
                      className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <h1 className=" text-cardHoverColor hover:underline cursor-pointer font-medium">
                      Sign Up?
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
