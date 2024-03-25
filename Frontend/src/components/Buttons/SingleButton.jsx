/* eslint-disable react/prop-types */
import React from "react";

const SingleButton = ({
  type = "",
  otherClass = "py-1 px-2 duration-300",
  text = "Button"
}) => {
  return (
    <>
      <button
        type={type}
        className={`bg-buttonColor rounded-md text-white font-medium cursor-pointer hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all ${otherClass}`}
      >
        {text}
      </button>
    </>
  );
};

export default SingleButton;
