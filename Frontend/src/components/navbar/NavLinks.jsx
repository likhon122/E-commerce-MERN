// import React from 'react'
import { NavLink } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const NavLinks = ({ showNavbar, setShowNavbar }) => {
  const links = [
    { id: 1, linkName: "Category" },
    { id: 2, linkName: "Products", path: "/products" },
    { id: 3, linkName: "Pages" },
    { id: 4, linkName: "Blog", path: "/blog" }
  ];

  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <>
      {links &&
        links.map((link) => (
          <div key={link.id}>
            <div
              className="flex justify-center items-center mx-3 px-2 cursor-pointer font-semibold my-2 "
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
                <li className="hover:text-cardHoverColor">{link.linkName}</li>
              )}
            </div>

            {/* small size  */}
          </div>
        ))}
    </>
  );
};

export default NavLinks;
