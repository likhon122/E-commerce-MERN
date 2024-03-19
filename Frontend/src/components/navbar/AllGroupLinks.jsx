/* eslint-disable react/prop-types */
// import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

import { FiMinus } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";

const AllGroupLinks = ({
  subLink = {},
  headingName = "",
  showNavbar = false,
  setShowNavbar
}) => {
  
  const [subLinkCategoryName, setSubLinkCategoryName] = useState("");
  const [subLinkCategoryOpen, setSubLinkCategoryOpen] = useState(false);

  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <>
      <div
        className={`hidden md:group-hover/edit:block absolute left-[141px] top-4 bg-gray-50 p-3 rounded-md lg:w-[600px] w-[400px] shadow-lg shadow-gray-500`}
      >
        <div className="grid lg:grid-cols-3 gap-5 grid-cols-2">
          {subLink.heading === headingName &&
            subLink.subLinkElements.map((subLinkElement, index) => {
              return (
                <div key={index} className="group/subheading">
                  <div>
                    <h1
                      className={`text-[18px] group-hover/subheading:text-cardHoverColor`}
                    >
                      {subLinkElement.linkHeader}
                    </h1>
                    <div>
                      {subLinkElement.subLink.map((sLink, index) => {
                        return (
                          <div key={index} className="ml-3">
                            <div>
                              <h1 className="text-[16px] text-gray-700">
                                {sLink.subLinkHeader}
                              </h1>
                              {sLink.links.map((link, index) => {
                                return (
                                  <div key={index}>
                                    <Link
                                      to={link.path}
                                      className="text-[16px] ml-6 font-normal hover:bg-orange-200 hover:underline text-black"
                                    >
                                      {link.name}
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Small size */}
      <div className={`md:hidden w-[70%] `}>
        {subLink.heading === headingName &&
          subLink.subLinkElements.map((element, index) => {
            return (
              <div key={index}>
                <div
                  className="flex w-full justify-between ml-6 mt-2 hover:text-cardHoverColor"
                  onClick={(e) => {
                    setSubLinkCategoryName(e.target.innerText);
                    setSubLinkCategoryOpen(
                      (subLinkCategoryOpen) => !subLinkCategoryOpen
                    );
                  }}
                >
                  <li
                    className={
                      subLinkCategoryOpen &&
                      subLinkCategoryName === element.linkHeader
                        ? "w-full flex justify-between bg-orange-50 px-2 rounded-full"
                        : "w-full flex justify-between px-2"
                    }
                  >
                    <h1
                      className={`${
                        subLinkCategoryOpen &&
                        subLinkCategoryName === element.linkHeader
                          ? "text-cardHoverColor"
                          : "text-black"
                      }`}
                    >
                      {element.linkHeader}
                    </h1>
                    {element.linkHeader === subLinkCategoryName &&
                    subLinkCategoryOpen ? (
                      <FiMinus
                        className={`${
                          subLinkCategoryOpen &&
                          subLinkCategoryName === element.linkHeader
                            ? "text-cardHoverColor mt-1"
                            : "text-black mt-1"
                        }`}
                      />
                    ) : (
                      <LuPlusCircle
                        className={`${
                          subLinkCategoryOpen &&
                          subLinkCategoryName === element.linkHeader
                            ? "text-cardHoverColor mt-1"
                            : "text-black mt-1"
                        }`}
                      />
                    )}
                  </li>
                </div>
                <div>
                  <div>
                    {element.subLink.map((sLink, index) => {
                      return (
                        <div key={index} className="ml-10">
                          {subLinkCategoryName === element.linkHeader &&
                            subLinkCategoryOpen && (
                              <div className="ml-2">
                                <h1 className="text-[16px] text-gray-700">
                                  {sLink.subLinkHeader}
                                </h1>
                              </div>
                            )}
                          {subLinkCategoryName === element.linkHeader &&
                            subLinkCategoryOpen &&
                            sLink.links.map((link, index) => {
                              return (
                                <div key={index}>
                                  <Link
                                    to={link.path}
                                    className="text-[16px] ml-6 font-normal hover:text-cardHoverColor hover:underline text-black"
                                    onClick={handleClick}
                                  >
                                    {link.name}
                                  </Link>
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllGroupLinks;
