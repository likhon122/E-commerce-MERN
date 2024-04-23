// import React from "react";

import { useField } from "formik";

// eslint-disable-next-line react/prop-types
const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className="md:font-medium font-normal">
        {label}
      </label>
      <input
        {...props}
        {...field}
        className="outline-none border border-gray-500 md:px-3 py-1 rounded-md focus:ring-cardHoverColor focus:border-cardHoverColor ring-gray-500 focus:ring-1 px-2"
        spellCheck="false"
        id={props.name}
      />
      {meta.error && meta.touched && (
        <p className="text-[14px] text-red-500">{meta.error}</p>
      )}
    </>
  );
};

export default CustomInput;
