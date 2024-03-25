/* eslint-disable react/prop-types */
import React from "react";

const LoadingAnimation = ({
  otherClass = "",
  text = "Loading...",
  classForSpinner = ""
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center relative ${otherClass} `}
    >
      <div
        className={`${classForSpinner} rounded-full border-x-8 border-gray-600 animate-spin-slow mb-8 bg-white`}
      ></div>
      <h2 className="text-xl font-extrabold text-gray-400 animate-pulse-slow absolute mb-6">
        {text}
      </h2>
    </div>
  );
};

export default LoadingAnimation;
