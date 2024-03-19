// import React from 'react'
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";

import links from "./Link";
import { useState } from "react";
import AllGroupLinks from "./AllGroupLinks";

// eslint-disable-next-line react/prop-types
const NavLinks = ({ showNavbar, setShowNavbar }) => {
  
  const [headingName, setHeadingName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSubDropdown, setOpenSubDropdown] = useState(false);

  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      {links &&
        links.map((link) => (
          <div key={link.id}>
            <div
              className="md:flex justify-center items-center mx-3 px-2 cursor-pointer font-semibold my-2 hidden"
              onClick={handleClick}
            >
              {link.path ? (
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-cardHoverColor ${
                      isActive ? "text-cardHoverColor" : "text-black"
                    }`
                  }
                  to={link.path}
                >
                  {link.linkName}
                </NavLink>
              ) : (
                <div className="md:p-2 group z-30 ">
                  <div className="">
                    <li className="hover:text-cardHoverColor group-hover:text-cardHoverColor">
                      <h1>{link.linkName}</h1>
                    </li>
                    <div className="absolute hidden md:group-hover:block hover:block bg-gray-50 top-9 rounded-md ">
                      {link.submenu &&
                        link.subLinks.map((subLink) => {
                          return (
                            <div
                              key={subLink.heading}
                              className="p-3 group/edit"
                            >
                              <div className="w-full flex flex-col justify-start ml-[-30px]">
                                <div
                                  className="flex justify-between w-full mx-[26px] hover:text-cardHoverColor group-hover/edit:text-cardHoverColor"
                                  onMouseEnter={(e) =>
                                    setHeadingName(e.target.innerText)
                                  }
                                >
                                  <h1>{subLink.heading}</h1>
                                  <FaArrowRight className="mt-1" />
                                </div>
                              </div>
                              <AllGroupLinks
                                subLink={subLink}
                                headingName={headingName}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

      {/* small size  */}
      {links &&
        links.map((link) => (
          <div key={link.id} className="w-full z-[99] md:hidden">
            <div className="flex justify-start items-center mx-3 px-2 cursor-pointer font-semibold my-3 md:hidden">
              {link.path ? (
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-cardHoverColor ${
                      isActive ? "text-cardHoverColor" : "text-black"
                    }`
                  }
                  to={link.path}
                  onClick={handleClick}
                >
                  {link.linkName}
                </NavLink>
              ) : (
                <div className="md:p-2 group z-30 w-full">
                  <div className="w-full">
                    <li
                      className="hover:text-cardHoverColor flex justify-between"
                      onClick={(e) => {
                        setLinkName(e.target.innerText);
                        setOpenDropdown(!openDropdown);
                      }}
                    >
                      <h1
                        className={
                          openDropdown && linkName === link.linkName
                            ? "text-cardHoverColor bg-orange-200 w-full rounded-full px-1"
                            : "text-black"
                        }
                      >
                        {link.linkName}
                      </h1>
                      {openDropdown && linkName === link.linkName ? (
                        <FiMinus
                          className={
                            openDropdown && linkName === link.linkName
                              ? "mt-1 absolute right-10 text-cardHoverColor"
                              : "text-black mt-1 absolute right-10"
                          }
                        />
                      ) : (
                        <LuPlusCircle
                          className={
                            openDropdown && linkName === link.linkName
                              ? "mt-1 absolute right-10 text-cardHoverColor"
                              : "text-black mt-1 absolute right-10"
                          }
                        />
                      )}
                    </li>
                    <div className="">
                      {linkName === "Category" &&
                        openDropdown &&
                        link.submenu &&
                        link.subLinks.map((subLink) => {
                          return (
                            <div
                              key={subLink.heading}
                              className="p-2 group/edit"
                            >
                              <div className="w-[100%] flex flex-col justify-start ml-[-25px]">
                                <div
                                  className="flex justify-between w-full mx-[30px] hover:text-cardHoverColor pr-5"
                                  onClick={(e) => {
                                    setHeadingName(e.target.innerText);
                                    e.target.innerText === subLink.heading &&
                                      setOpenSubDropdown(!openSubDropdown);
                                  }}
                                >
                                  <li
                                    className={
                                      openSubDropdown &&
                                      headingName === subLink.heading
                                        ? "flex justify-between w-full bg-orange-100 px-2 rounded-full "
                                        : " bg-inherit flex justify-between px-2 w-full"
                                    }
                                  >
                                    <h1
                                      className={`${
                                        openSubDropdown &&
                                        headingName === subLink.heading
                                          ? "text-cardHoverColor"
                                          : "text-black"
                                      }`}
                                    >
                                      {subLink.heading}
                                    </h1>
                                    {openSubDropdown &&
                                    headingName === subLink.heading ? (
                                      <FiMinus
                                        className={
                                          openSubDropdown &&
                                          headingName === subLink.heading
                                            ? "mt-1  text-cardHoverColor"
                                            : "text-black mt-1 "
                                        }
                                      />
                                    ) : (
                                      <LuPlusCircle
                                        className={
                                          openSubDropdown &&
                                          headingName === subLink.heading
                                            ? "mt-1  text-cardHoverColor"
                                            : "text-black mt-1 "
                                        }
                                      />
                                    )}
                                  </li>
                                </div>
                              </div>
                              <div className="md:hidden">
                                {openSubDropdown && (
                                  <AllGroupLinks
                                    subLink={subLink}
                                    headingName={headingName}
                                    showNavbar={showNavbar}
                                    setShowNavbar={setShowNavbar}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default NavLinks;
