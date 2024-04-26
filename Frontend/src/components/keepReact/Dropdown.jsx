"use client";
import { Dropdown } from "keep-react";
import { useState } from "react";

import { FiMinus } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";

export const DropdownComponent = () => {
  // const links = [
  //   {
  //     manageAccount: ["My Profile", "My Address Book", "My Payment Options"]
  //   },
  //   {
  //     orders: ["My Returns", "My Cancellations"]
  //   },
  //   {
  //     wishes: ["Wishes"]
  //   }
  // ];
  const [showManageAccountLinks, setShowManageLinks] = useState(false);
  const [showOrderLinks, setShowOrderLinks] = useState(false);
  const [showWishesLinks, setShowWishesLinks] = useState(false);
  return (
    <Dropdown>
      <div onClick={(e) => console.log(e.target.innerText)}>
        <Dropdown.List>
          <div
            onClick={() => {
              setShowManageLinks(!showManageAccountLinks);
              setShowOrderLinks(false);
              setShowWishesLinks(false);
            }}
          >
            <div className="flex justify-between">
              <Dropdown.Item
                className={`${
                  showManageAccountLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                Manage my account
              </Dropdown.Item>
              <div
                className={`mt-[12px] ${
                  showManageAccountLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                {showManageAccountLinks ? <FiMinus /> : <LuPlusCircle />}
              </div>
            </div>
            {showManageAccountLinks && (
              <div>
                <Dropdown.List className={"ml-4 -mt-3 font-[400]"}>
                  <Dropdown.Item className={"-mt-3 font-[400]"}>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item className={"-mt-3 font-[400]"}>
                    My Address Book
                  </Dropdown.Item>
                  <Dropdown.Item className={"-mt-3 font-[400]"}>
                    My Payment Optionss
                  </Dropdown.Item>
                </Dropdown.List>
              </div>
            )}
          </div>
          <div>
            <div
              className="flex justify-between "
              onClick={() => {
                setShowOrderLinks(!showOrderLinks);
                setShowWishesLinks(false);
                setShowManageLinks(false);
              }}
            >
              <div
                className={` ${
                  showOrderLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                <Dropdown.Item
                  className={` ${
                    showOrderLinks ? "text-buttonColor" : " text-black"
                  }`}
                >
                  My Orders
                </Dropdown.Item>
              </div>
              <div
                className={`mt-[12px] ${
                  showOrderLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                {showOrderLinks ? <FiMinus /> : <LuPlusCircle />}
              </div>
            </div>
            {showOrderLinks && (
              <Dropdown.List className={"ml-4 -mt-3 font-[400]"}>
                <Dropdown.Item className={"-mt-3 font-[400]"}>
                  My Returns
                </Dropdown.Item>
                <Dropdown.Item className={"-mt-3 font-[400]"}>
                  My Cancellations
                </Dropdown.Item>
              </Dropdown.List>
            )}
          </div>
          <div>
            <div
              className="flex justify-between mt-2"
              onClick={() => {
                setShowWishesLinks(!showWishesLinks);
                setShowManageLinks(false);
                setShowOrderLinks(false);
              }}
            >
              <Dropdown.Item
                className={`-mt-2  ${
                  showWishesLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                My WishList
              </Dropdown.Item>
              <div
                className={`mt-[3px] ${
                  showWishesLinks ? "text-buttonColor" : " text-black"
                }`}
              >
                {showWishesLinks ? <FiMinus /> : <LuPlusCircle />}
              </div>
            </div>
            {showWishesLinks && (
              <Dropdown.List className={"ml-4 -mt-3 font-[400]"}>
                <Dropdown.Item className={"-mt-3 font-[400]"}>
                  Wishes
                </Dropdown.Item>
              </Dropdown.List>
            )}
          </div>
        </Dropdown.List>
      </div>
    </Dropdown>
  );
};
