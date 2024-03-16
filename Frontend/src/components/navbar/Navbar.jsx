// import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  BsTelephoneInbound,
  BsBookmarkHeartFill,
  BsCart,
  BsThreeDots
} from "react-icons/bs";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { logo } from "..";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <header>
      <nav>
        {/* upper Navbar */}
        <div className="bg-white shadow-md shadow-gray-200 mb-1">
          <div className="flex items-center justify-between h-[5vh] md:mx-[15%] mx-[10%]">
            <div className="">
              <div className="md:hidden block cursor-pointer">
                {showNavbar ? (
                  <FaXmark
                    className="text-xl"
                    onClick={() => {
                      setShowNavbar(!showNavbar);
                      showDetails && setShowDetails(!showDetails);
                    }}
                  />
                ) : (
                  <FaBars
                    className="text-xl "
                    onClick={() => {
                      setShowNavbar(!showNavbar);
                      showDetails && setShowDetails(!showDetails);
                    }}
                  />
                )}
              </div>
              <ul className="md:flex justify-center items-center hidden">
                <li className="font-semibold ">
                  <NavLink
                    className={({ isActive }) =>
                      `hover:text-cardHoverColor ${
                        isActive ? "text-cardHoverColor" : "text-black"
                      }`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <NavLinks />
              </ul>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="text-xl text-borderColor">
                <BsTelephoneInbound />
              </div>
              <div>
                <h3 className="font-normal">+8801611513484</h3>
              </div>
            </div>
          </div>
        </div>

        {/* bottom navbar  */}
        <div className="bg-white shadow-md shadow-gray-200">
          <div className="mx-[10%]  flex justify-between items-center h-[6vh]">
            <div>
              <NavLink to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  className="max-h-[60px] max-w-[60px] cursor-pointer ml-[-15px] "
                />
              </NavLink>
            </div>
            <div className="mx-2 w-full flex items-center justify-center">
              <form className="flex justify-center items-center relative w-[90%] lg:w-[65%]">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search any item"
                  className=" w-full outline-none px-2 md:text-md text-sm md:font-medium border border-borderColor rounded-md lg:p-1.5 p-1 focus:ring-1 ring-buttonColor"
                />
                <button
                  type="submit"
                  className="bg-buttonColor absolute right-0 md:p-[8px] rounded-r-md text-white font-extrabold p-[8px]"
                >
                  <IoSearchSharp className="font-bold text-[13px] lg:text-[17px]" />
                </button>
              </form>
            </div>
            <div>
              <div className="md:hidden block">
                {showDetails ? (
                  <div className="p-[3px] border border-gray-500 rounded-md">
                    <FaXmark
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        setShowDetails(!showDetails);
                        showNavbar && setShowNavbar(!showNavbar);
                      }}
                    />
                  </div>
                ) : (
                  <div className="p-[3px] border border-gray-500 rounded-md">
                    <BsThreeDots
                      className="text-xl cursor-pointer"
                      onClick={() => {
                        setShowDetails(!showDetails);
                        showNavbar && setShowNavbar(!showNavbar);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="md:flex justify-between items-center gap-2  sm:text-[13px] hidden lg:text-[17px]">
                <Link to={"/account"}>
                  <div className="flex justify-center items-center gap-1  cursor-pointer hover:text-cardHoverColor">
                    <RiAccountPinBoxLine className="lg:text-xl text-[17px]" />
                    <h3 className="text-md">Account</h3>
                  </div>
                </Link>
                <Link to={"/wishlist"}>
                  <div className="flex justify-center items-center  gap-1 cursor-pointer hover:text-cardHoverColor">
                    <BsBookmarkHeartFill className="lg:text-xl text-[17px]" />
                    <h3 className="text-md">Wishlist</h3>
                  </div>
                </Link>
                <Link to={"/cart"}>
                  <div className="flex justify-center items-center gap-1 cursor-pointer hover:text-cardHoverColor">
                    <BsCart className="lg:text-xl text-[17px]" />
                    <h3 className="text-md">Cart</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* small size */}
        {/* upper navbar for mobile size  */}
        <div className=" md:hidden  overflow-hidden ">
          <div
            className={`duration-700 transition-all absolute left-[-100%] w-full h-screen pt-4 ${
              showNavbar && "left-[0] bg-gray-400 "
            }`}
          >
            <ul className={`flex flex-col`}>
              <li className="font-semibold mx-3 px-2 my-2">
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-cardHoverColor ${
                      isActive ? "text-cardHoverColor" : "text-black"
                    }`
                  }
                  to="/"
                  onClick={() => setShowNavbar(!showNavbar)}
                >
                  Home
                </NavLink>
              </li>
              <div className="flex flex-col items-start">
                <NavLinks
                  showNavbar={showNavbar}
                  setShowNavbar={setShowNavbar}
                />
              </div>
            </ul>
          </div>
        </div>

        {/*Profile details for mobile size*/}
        <div
          className={`md:hidden absolute right-[45px] rounded-md p-3 bg-gray-400  ${
            showDetails ? "block" : "hidden"
          }`}
        >
          <div className=" flex flex-col justify-start ">
            <Link to={"/account"} onClick={() => setShowDetails(!showDetails)}>
              <div className="flex items-center gap-1 cursor-pointer mb-2 hover:text-cardHoverColor">
                <RiAccountPinBoxLine className=" text-[17px] " />
                <h3 className="text-lg">Account</h3>
              </div>
            </Link>
            <Link to={"/wishlist"} onClick={() => setShowDetails(!showDetails)}>
              <div className="flex items-center  gap-1 cursor-pointer mb-2 hover:text-cardHoverColor">
                <BsBookmarkHeartFill className=" text-[17px]" />
                <h3 className="text-lg">Wishlist</h3>
              </div>
            </Link>
            <Link to={"/cart"} onClick={() => setShowDetails(!showDetails)}>
              <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                <BsCart className=" text-[17px]" />
                <h3 className="text-lg">Cart</h3>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
