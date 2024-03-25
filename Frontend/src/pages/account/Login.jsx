// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { logo } from "../..";
import { loginFormValidation } from "../../validation/FormValidation";
import CustomInput from "../../components/customInput/CustomInput";
import { useLoginUserMutation } from "../../features/FetchProductData";
import { AlertComponent } from "../../components/keepReact/Alart";

const Login = () => {
  const [
    loginUserMutation,
    { isError, data: userData, isLoading, isSuccess, error: errorMessage }
  ] = useLoginUserMutation();

  const navigate = useNavigate();
  const handleSubmit = async (values, resetForm) => {
    try {
      const data = await loginUserMutation(values);
      console.log(data);
      setTimeout(() => {
        if (data.data.success) {
          navigate("/");
          resetForm();
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isSuccess && (
        <div className="flex items-center justify-center mt-[60px] -mb-[60px]">
          <AlertComponent color="success" message={userData.message} />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center mt-[60px] -mb-[60px]">
          <AlertComponent color="error" message={errorMessage?.data.message} />
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
                <h1 className="-ml-6 text-2xl font-bold">Login</h1>
              </div>
            </div>
            <div className="">
              <Formik
                initialValues={{
                  email: "",
                  password: ""
                }}
                validationSchema={loginFormValidation}
                onSubmit={handleSubmit}
              >
                <Form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <CustomInput type="email" name="email" label="Email" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </div>
                  <div className="md:flex flex-col md:flex-row justify-between ">
                    <div className="flex gap-2 mb-2 md:mb-0">
                      <input
                        type="checkbox"
                        id="remember"
                        className="accent-buttonColor size-4 mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="remember"
                        className="md:font-medium font-normal"
                      >
                        Remember me
                      </label>
                    </div>
                    <div>
                      <h1 className="text-cardHoverColor hover:underline cursor-pointer font-medium">
                        Forgot Password?
                      </h1>
                    </div>
                  </div>
                  <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                    <div className=" md:w-[40%] mb-2 md:mb-0">
                      <button
                        type="submit"
                        className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                      >
                        {isLoading ? "Login..." : "Login"}
                      </button>
                    </div>
                    <div>
                      <Link
                        to={"/register"}
                        className=" text-cardHoverColor hover:underline cursor-pointer font-medium"
                      >
                        Sign Up?
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

export default Login;
