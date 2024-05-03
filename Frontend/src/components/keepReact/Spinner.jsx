"use client";
import { Spinner } from "keep-react";

const SpinnerComponent = ({ extraClass = "h-4 w-4" }) => {
  return (
    <div className="flex justify-center items-center mt-[1px]">
      <div
        className={`animate-spin rounded-full  border border-t-0 border-b-0  border-blue-900 ${extraClass} `}
      ></div>
    </div>
  );
};

export default SpinnerComponent;
