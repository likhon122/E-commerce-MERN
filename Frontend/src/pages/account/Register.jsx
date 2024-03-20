// import React from 'react'

import { logo } from "../..";

const Register = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center min-h-[60vh] max-h-max w-full">
          <div className="bg-white my-5 rounded-md md:p-6 p-3 shadow-lg shadow-gray-500 border  md:min-w-[60%] lg:min-w-[50%] xl:min-w-[30%] min-w-[90%]">
            <div className="md:-mt-6 md:pb-6 pb-3 -mt-3">
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full max-h-20 max-w-20"
                />
                <h1 className="-ml-6 text-2xl font-bold">Registration</h1>
              </div>
            </div>
            <div className="">
              <form className="flex flex-col gap-3">
                <div className="md:flex md:justify-between md:items-center gap-2 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="firstName"
                      className="md:font-medium font-normal"
                    >
                      FirstName
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2 w="
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="lastName"
                      className="md:font-medium font-normal"
                    >
                      LastName
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2"
                      spellCheck="false"
                    />
                  </div>
                </div>
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
                  <label htmlFor="phone" className="md:font-medium font-normal">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="outline-none border border-gray-500 pmd:x-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1  px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="address"
                    className="md:font-medium font-normal"
                  >
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    spellCheck="false"
                    className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="image" className="md:font-medium font-normal">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="address"
                    className="cursor-pointer border border-gray-500 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="accent-buttonColor size-4 mt-1 cursor-pointer"
                  />
                  <label
                    htmlFor="agreement"
                    className="md:font-medium font-normal"
                  >
                    I have all terms and condition
                  </label>
                </div>
                <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                  <div className=" md:w-[40%] mb-2 md:mb-0">
                    <input
                      type="submit"
                      className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h1 className=" text-cardHoverColor hover:underline cursor-pointer font-medium">
                      I have an account?
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

export default Register;
