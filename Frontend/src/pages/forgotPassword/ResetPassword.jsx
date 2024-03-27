// import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { CiLogin } from "react-icons/ci";

import { logo } from "../..";
import { resetPasswordValidation } from "../../validation/FormValidation";
import CustomInput from "../../components/customInput/CustomInput";

import axiosApiFetch from "../../api/apiConfig";
import { AlertComponent } from "../../components/keepReact/Alart";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  if (!token) {
    navigate("/forgot-password");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      if (token) {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        const password = { ...values, confirmPassword };

        const message = await axiosApiFetch.put("/users/reset-password", {
          password: password.password,
          token
        });

        console.log(message.data.message);

        setIsLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setError(error.response.data.message);
      setIsError(true);
    }
  };

  return (
    <>
      {isError && (
        <div className="flex items-center justify-center mt-[60px] -mb-[60px]">
          <AlertComponent color="error" message={error} />
        </div>
      )}

      {success ? (
        <div className="min-h-[80vh]">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="flex items-center justify-center flex-col gap-3">
              <div className="text-2xl font-medium text-green-700">
                <h1>Reset Password is Successful !!</h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-lg text-buttonColor">Go to Login Page</h1>
                <button className="flex gap-2 justify-center items-center bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300">
                  <CiLogin size={21} className="font-semibold" />
                  <Link to={"/login"} className="mr-2">
                    Login
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                  <h1 className="-ml-6 text-2xl font-bold">Reset Password</h1>
                </div>
              </div>
              <div className="">
                <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: ""
                  }}
                  validationSchema={resetPasswordValidation}
                  onSubmit={handleSubmit}
                >
                  <Form className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <CustomInput
                        type="password"
                        name="password"
                        label="Password"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <CustomInput
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                      />
                    </div>
                    <div className="md:flex md:flex-row justify-center items-center text-center w-full flex-col">
                      <div className=" md:w-[50%] mb-2 md:mb-0">
                        <button
                          type="submit"
                          className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                        >
                          {isLoading ? "Reseting..." : "Reset Password"}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
