// import React from 'react'
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

import { logo } from "../..";
import { forgotPasswordValidation } from "../../validation/FormValidation";
import CustomInput from "../../components/customInput/CustomInput";
import axiosApiFetch from "../../api/apiConfig";
import { AlertComponent } from "../../components/keepReact/Alart";
import { useState } from "react";

const ForgotPassword = () => {
  const [logOutMessage, setLogOutMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      console.log("submitted");
      setIsLoading(true);
      setIsError(false);
      setError(null);
      const data = await axiosApiFetch.post("/users/forget-password", {
        ...values
      });

      setLogOutMessage(data.data.message);
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setError(error.response.data.message);
      setIsError(true);
    }
  };

  return (
    <>
      {success && logOutMessage && (
        <div className="flex items-center justify-center mt-[60px] -mb-[60px]">
          <AlertComponent color="primary" message={logOutMessage} />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center mt-[60px] -mb-[60px]">
          <AlertComponent color="error" message={error} />
        </div>
      )}

      <div className="">
        <div className="flex justify-center items-center min-h-[60vh] max-h-max w-full">
          <div className="bg-white my-5 rounded-md md:p-6 p-3 shadow-lg shadow-gray-500 border md:min-w-[60%] lg:min-w-[50%] xl:min-w-[30%] min-w-[90%]">
            <div className="md:-mt-6 md:pb-6 pb-3 -mt-3">
              <div className="flex items-center justify-center gap-2">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full max-h-20 max-w-20"
                />
                <h1 className="-ml-6 text-2xl font-bold">Forgot Password</h1>
              </div>
            </div>
            <div className="">
              <Formik
                initialValues={{
                  email: ""
                }}
                validationSchema={forgotPasswordValidation}
                onSubmit={handleSubmit}
              >
                <Form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <CustomInput type="email" name="email" label="Email" />
                  </div>

                  <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                    <div className=" md:w-[40%] mb-2 md:mb-0">
                      <button
                        type="submit"
                        className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                      >
                        {isLoading ? "Loading..." : "Forget"}
                      </button>
                    </div>
                    <div>
                      <Link
                        to={"/login"}
                        className=" text-cardHoverColor hover:underline cursor-pointer font-medium"
                      >
                        Go to Login
                      </Link>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
