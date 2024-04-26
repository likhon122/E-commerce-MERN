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

import { logo } from "../../index";
import NavLinks from "./NavLinks";
import { AvatarComponent } from "../keepReact/Avatar";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "../../pages/account/ProfileInfo";
import { getUserDetails } from "../../app/features/ProfileSlice";

const Navbar = () => {
  const { userInfo, isError, isLoggedIn } = useSelector((state) => state.auth);
  const { userInfo: loginUserInfo, isSuccess } = useSelector(
    (state) => state.profile
  );

  const [showNavbar, setShowNavbar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);

  const dispatch = useDispatch();

  return (
    <header>
      <nav>
        {/* upper Navbar */}
        <div className="bg-white shadow-md shadow-gray-200 mb-1">
          <div className="flex items-center justify-between h-[5vh] md:mx-[10%] mx-[10%]">
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
                      setOpenUserProfile(false);
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
                <NavLinks
                  showNavbar={showNavbar}
                  setShowNavbar={setShowNavbar}
                />
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

        {/* bottom navbar */}

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
                {isLoggedIn ? (
                  <div
                    className="cursor-pointer border-buttonColor border-[2px] rounded-full -mr-5"
                    onClick={() => {
                      setOpenUserProfile(!openUserProfile);
                      setShowNavbar(false);
                    }}
                  >
                    <AvatarComponent path={userInfo.image} size="sm" />
                  </div>
                ) : showDetails ? (
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

                {/* User is logged out and logged in handle */}
                {isLoggedIn ? (
                  <div
                    title="Account"
                    className="cursor-pointer border-buttonColor border-[2px] rounded-full p-1"
                    onClick={() => {
                      setOpenUserProfile(!openUserProfile);

                      if (!isSuccess) {
                        dispatch(getUserDetails(userInfo._id));
                      }
                    }}
                  >
                    <AvatarComponent path={userInfo.image} size="md" />
                  </div>
                ) : (
                  <Link to={"/register"}>
                    <div className="flex justify-center items-center gap-1  cursor-pointer hover:text-cardHoverColor">
                      <RiAccountPinBoxLine className="lg:text-xl text-[17px]" />
                      <div>
                        <h3 className="text-[18px]">Account</h3>
                        <h3 className="text-[12px] -mt-2">Register/Login</h3>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* When user is clicked by his account then this div is show */}

        {/* small size */}

        {/* upper navbar for user is logged out and logged in mobile size  */}
        <div className=" md:hidden overflow-x-hidden overflow-y-scroll ">
          <div
            className={`duration-700 transition-all absolute left-[-100%] w-full h-full pt-4 z-[99] ${
              showNavbar && "left-[0] bg-gray-100 "
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

        {/*Profile details for  user is logged in and logged out mobile size*/}
        <div>
          {isLoggedIn ? (
            <div className="overflow-x-hidden">
              <div
                className={`absolute h-full z-[99] right-[-100%]  ${
                  openUserProfile &&
                  "right-[0] bg-gray-50 duration-700 transition-all ease-in-out"
                }`}
              >
                {openUserProfile && (
                  <div className="min-h-screen bg-gray-50 w-full rounded-md ">
                    <ProfileInfo
                      openUserProfile={openUserProfile}
                      setOpenUserProfile={setOpenUserProfile}
                      userInfo={loginUserInfo}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`md:hidden absolute right-[45px]  rounded-md p-3 bg-gray-100 z-[99] ${
                showDetails ? "block" : "hidden"
              }`}
            >
              <div className=" flex flex-col justify-start ">
                <Link
                  to={"/register"}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex items-center gap-1 cursor-pointer mb-2 hover:text-cardHoverColor">
                    <RiAccountPinBoxLine className=" text-[18px] text-cardHoverColor" />
                    <div>
                      <h3 className="text-md">Account</h3>
                      <h3 className="text-[11px]">Register/Login</h3>
                    </div>
                  </div>
                </Link>
                <Link
                  to={"/wishlist"}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <div className="flex items-center  gap-1 cursor-pointer mb-2 hover:text-cardHoverColor">
                    <BsBookmarkHeartFill className=" text-[14px] text-cardHoverColor" />
                    <h3 className="text-md">Wishlist</h3>
                  </div>
                </Link>
                <Link to={"/cart"} onClick={() => setShowDetails(!showDetails)}>
                  <div className="flex  items-center gap-1 cursor-pointer mb-1 hover:text-cardHoverColor">
                    <BsCart className=" text-[14px] text-cardHoverColor" />
                    <h3 className="text-md">Cart</h3>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
