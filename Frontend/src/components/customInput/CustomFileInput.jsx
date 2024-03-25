// Inside CustomFileInput.js

import React from "react";
import { useField } from "formik";

const CustomFileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log(file.name, file.size, file.type); // Log image details
    helpers.setValue(file);
  };

  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input
        type="file"
        id={props.name}
        onChange={() => console.log("Hello")}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default CustomFileInput;
