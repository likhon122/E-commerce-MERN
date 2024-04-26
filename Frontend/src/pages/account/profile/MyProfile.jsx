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
    if (resetFormData || isSuccess) {
      console.log("first");
      resetForm();
    }
    const name = firstName + " " + lastName;
    const userInfo = { id, name, ...values };

    if (userInfo.newPassword == "") {
      delete userInfo.newPassword;
    }
    if (userInfo.confirmPassword == "") {
      delete userInfo.confirmPassword;
    }
    if (!resetFormData) {
      dispatch(updateUserDetails(userInfo));
    }
  };

  const clearForm = () => {
    setResetFormData(true);
    submitHandler();
  };

  useEffect(() => {
    if (updateError && !updateSuccess) {
      setErrorMessage(updateError);
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        dispatch(showMessage());
      }, 3000);

      return () => clearTimeout(timeout);
    }
    if (!updateError && updateSuccess) {
      setSuccessMessage(isSuccess);

      const timeout = setTimeout(() => {
        setSuccessMessage(null);
        dispatch(showMessage());
      }, 3000);

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
      <div className=" p-5 rounded-md shadow-md bg-gray-50">
        <div className="my-2 w-fit mr-2">
          <h1 className="text-xl font-[500] border-b border-buttonColor pb-[2px]">
            Edit Your Profile
          </h1>
        </div>
        <div>
          <div className="">
            <Formik
              initialValues={{
                firstName: firstName,
                lastName: lastName,
                phone: userInfo.phone,
                address: userInfo.address,
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
              }}
              validationSchema={updateProfileValidation}
              onSubmit={(e, { resetForm }) => {
                console.log(e);
                resetForm();
              }}
            >
              <Form className="flex flex-col gap-3">
                <div className="md:flex md:justify-between md:items-center gap-2 flex-col lg:flex-row ">
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
                <div className="md:flex md:justify-between md:items-center gap-2 flex-col lg:flex-row">
                  <div className="flex flex-col gap-1 w-full">
                    <CustomInput label="Phone" name="phone" type="tel" />
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

                <div className="md:flex md:flex-row justify-center items-center text-center w-full flex-col ">
                  <div className=" mb-2 md:mb-0 flex justify-between  flex-col md:flex-row w-[90%]">
                    <button
                      type="submit"
                      className=" w-[130px] bg-transparent py-1 rounded-md text-buttonColor font-medium cursor-pointer mt-2 hover:bg-buttonColor hover:text-white border border-buttonColor transition-all duration-300"
                      onClick={clearForm}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" w-[130px] bg-buttonColor py-1 rounded-md text-white font-medium cursor-pointer mt-2 hover:bg-transparent hover:text-buttonColor border border-buttonColor transition-all duration-300"
                    >
                      {updateLoading ? "Loading ..." : "Save Changes"}
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
