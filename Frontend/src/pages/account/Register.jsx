import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { logo } from "../..";
import CustomInput from "../../components/customInput/CustomInput";
import { registrationFormValidation } from "../../validation/FormValidation";
import CustomCheckBox from "../../components/customInput/CustomCheckBox";
import { AlertComponent } from "../../components/keepReact/Alart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosApiFetch from "../../api/apiConfig";

const Register = () => {
  const navigate = useNavigate();

  const { isSuccess: successful } = useSelector(
    (state) => state.verifyUserIsExist
  );

  const [registrationData, setRegistrationData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (
    { firstName, lastName, ...values },
    { resetForm }
  ) => {
    const name = firstName + " " + lastName;

    const userInfo = { name, ...values };

    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const data = await axiosApiFetch.post("/users/process-register", {
        ...userInfo
      });

      setRegistrationData(data.data.message);

      setIsSuccess(true);
      resetForm();
      setIsLoading(false);
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      setError(error.response.data.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (successful) {
      navigate("/");
    }
  }, [successful, navigate]);

  return (
    <>
      {isSuccess && (
        <div className="flex items-center justify-center mt-4">
          <AlertComponent color="primary" message={registrationData} />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center mt-4">
          <AlertComponent color="error" message={error} />
        </div>
      )}

      <div className="">
        <div className="flex justify-center items-center min-h-[60vh] max-h-max w-full">
          <div className="bg-white my-5 rounded-md md:p-6 p-3 shadow-lg shadow-gray-500 border  md:min-w-[60%] lg:min-w-[50%] xl:min-w-[30%] min-w-[90%]">
            <div className="md:-mt-6 md:pb-6 pb-3 -mt-3">
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full max-h-20 max-w-20"
                />
                <h1 className="-ml-6 text-2xl font-bold">Registration</h1>
              </div>
            </div>
            <div className="">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  phone: "",
                  address: ""
                }}
                validationSchema={registrationFormValidation}
                onSubmit={submitHandler}
              >
                <Form className="flex flex-col gap-3">
                  <div className="md:flex md:justify-between md:items-center gap-2 ">
                    <div className="flex flex-col gap-1 w-full">
                      <CustomInput
                        label="First Name"
                        name="firstName"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <CustomInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput label="Email" name="email" type="email" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput
                      label="Password"
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput label="Phone Number" name="phone" type="tel" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomInput
                      label="Full Address"
                      name="address"
                      type="text"
                    />
                  </div>

                  <div className="flex gap-2">
                    <CustomCheckBox name="agreement" type="checkbox" />
                  </div>
                  <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                    <div className=" md:w-[40%] mb-2 md:mb-0">
                      <button
                        type="submit"
                        className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                      >
                        {isLoading ? "Loading ..." : "Submit"}
                      </button>
                    </div>
                    <div>
                      <Link
                        to={"/login"}
                        className=" text-cardHoverColor hover:underline cursor-pointer font-medium"
                      >
                        Sign In?
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

export default Register;
