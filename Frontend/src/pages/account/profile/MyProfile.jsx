import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/customInput/CustomInput";
import { Formik, Form } from "formik";
import { updateProfileValidation } from "../../../validation/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  showMessage,
  updateUserDetails
} from "../../../app/features/ProfileSlice";
import { AlertComponent } from "../../../components/keepReact/Alart";

const MyProfile = ({ userInfo }) => {
  const {
    updateLoading,
    isError,
    error,
    isSuccess,
    updateSuccess,
    updateError
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  let splitName = userInfo?.name?.split(" ");
  let firstName;
  let lastName;
  let id = userInfo?._id;
  if (splitName) {
    firstName = splitName[0];
    lastName = splitName[1];
  }

  const [resetFormData, setResetFormData] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const submitHandler = ({ firstName, lastName, ...values }, { resetForm }) => {
    if (resetFormData) {
      setResetFormData(false);
      // resetForm();
    }
    const name = firstName + " " + lastName;
    const userInfo = { id, name, ...values };

    if (userInfo.newPassword == "") {
      delete userInfo.newPassword;
    }
    if (userInfo.confirmPassword == "") {
      delete userInfo.confirmPassword;
    }
    console.log(userInfo);
    dispatch(updateUserDetails(userInfo));
  };

  useEffect(() => {
    if (updateError || updateSuccess) {
      setErrorMessage(updateError);
      setSuccessMessage(isSuccess);

      const timeout = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
        dispatch(showMessage());
      }, 3000); // Clear messages after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [updateError, updateSuccess, dispatch, isSuccess]);
  return (
    <div>
      <div>
        {successMessage && (
          <AlertComponent color="success" message="User update Successful" />
        )}
        {errorMessage && <AlertComponent color="error" message={updateError} />}
      </div>
      <div>
        <div>
          <h1>Edit Profile</h1>
        </div>
        <div>
          <div className="">
            <Formik
              initialValues={{
                firstName: firstName,
                lastName: lastName,
                email: userInfo.email,
                address: userInfo.address,
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
              }}
              validationSchema={updateProfileValidation}
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
                <div className="md:flex md:justify-between md:items-center gap-2 ">
                  <div className="flex flex-col gap-1 w-full">
                    <CustomInput label="Email" name="email" type="email" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <CustomInput label="Address" name="address" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <CustomInput
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <CustomInput
                    label="New Password"
                    name="newPassword"
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

                <div className="md:flex md:flex-row justify-between items-center text-center w-full flex-col">
                  <div className=" md:w-[40%] mb-2 md:mb-0">
                    <button
                      type="submit"
                      className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                      onClick={(e) => setResetFormData(true)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                    >
                      {/* {updateLoading ? "Loading ..." : "Save Changes"} */}
                      save Changes
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
