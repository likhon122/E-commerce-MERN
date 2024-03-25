// import React from "react";

import { useField } from "formik";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CustomCheckBox = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex flex-col  items-start">
        <div className="flex justify-center gap-2">
          <input
            {...props}
            {...field}
            className="accent-buttonColor size-4 mt-1 cursor-pointer"
          />
          <label htmlFor={props.name} className="md:font-medium font-normal">
            I have all{" "}
            <Link
              to={"/rules/terms"}
              className="text-buttonColor hover:underline"
            >
              terms
            </Link>{" "}
            and{" "}
            <Link
              to={"/rules/condition"}
              className="text-buttonColor hover:underline"
            >
              condition
            </Link>
          </label>
        </div>
        {meta.error && meta.touched && (
          <p className="text-[14px] text-red-500">
            Please accept terms and condition first!
          </p>
        )}
      </div>
    </>
  );
};

export default CustomCheckBox;
