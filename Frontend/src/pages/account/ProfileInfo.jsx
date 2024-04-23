/* eslint-disable react/prop-types */
"use client";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import {
  Chat,
  Gear,
  ShoppingCart,
  SignIn,
  SquaresFour,
  Users
} from "phosphor-react";
import { Avatar, Divider, Sidebar, Typography } from "keep-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ModalComponent } from "../../components/keepReact/CheckPermission";

const ProfileInfo = ({
  openUserProfile = false,
  setOpenUserProfile,
  userInfo
}) => {
  console.log(userInfo);
  const [showPermission, setShowPermission] = useState(false);
  const handleClick = () => {
    setOpenUserProfile(!openUserProfile);
  };

  const handleLogOut = () => {
    setShowPermission(true);
  };

  return (
    <div>
      <div className="flex items-end justify-end mr-6 ">
        <div className="mt-3">
          <div className="bg-slate-300 cursor-pointer" onClick={handleClick}>
            <FaXmark size={24} />
          </div>
        </div>
      </div>
      <Sidebar className="bg-gray-50 shadow-none px-8">
        <Sidebar.Body>
          <div className="flex flex-col gap-3">
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={`/profile/${userInfo._id}`}>
                <Sidebar.Item>
                  <SquaresFour size={24} />
                  <h1 className="text-[15px] md:text-[16px]">Profile</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={"/cart"}>
                <Sidebar.Item>
                  <ShoppingCart size={24} />
                  <h1 className="text-[15px] md:text-[16px]">Cart</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={"/wishlist"}>
                <Sidebar.Item>
                  <BsBookmarkHeartFill size={22} />
                  <h1 className="text-[15px] md:text-[16px]">Wishlist</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={"/message"}>
                <Sidebar.Item>
                  <Chat size={24} />
                  <h1 className="text-[15px] md:text-[16px]">Message</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={"/settings"}>
                <Sidebar.Item>
                  <Gear size={24} />
                  <h1 className="text-[15px] md:text-[16px]">Settings</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleClick}
            >
              <Link to={"/user"}>
                <Sidebar.Item>
                  <Users size={24} />
                  <h1 className="text-[15px] md:text-[16px]">User</h1>
                </Sidebar.Item>
              </Link>
            </div>
            <div
              className="hover:bg-gray-200 cursor-pointer transition-all duration-300 px-2"
              onClick={handleLogOut}
            >
              <>
                <Sidebar.Item>
                  <SignIn size={24} />
                  <ModalComponent modalName="Log Out" extraClass="w-full" />
                </Sidebar.Item>
              </>
            </div>
          </div>
        </Sidebar.Body>

        <Divider className="my-3" />
        <Sidebar.Footer className="flex items-center gap-2">
          <div>
            <Avatar shape="circle" img={userInfo.image} />
          </div>
          <div>
            <Typography
              variant="p"
              className="mb-0 md:text-body-2 text-body-3 font-medium text-metal-600 "
            >
              {userInfo.name}
            </Typography>
          </div>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
};

export default ProfileInfo;
