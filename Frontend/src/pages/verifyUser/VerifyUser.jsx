import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useVerifyUserMutation } from "../../features/FetchProductData";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AlertComponent } from "../../components/keepReact/Alart";
import SingleButton from "../../components/Buttons/SingleButton";
import axiosApiFetch from "../../api/apiConfig";

const VerifyUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const params = useParams();
  const token = params.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = axiosApiFetch.post("/users/verify-user", { token });
        console.log(response);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
        setIsSuccess(false);
      }
    }
  }, []);

  const pageStart = isLoading || isError || isSuccess ? false : true;

  return (
    <div className="min-h-[80vh]">
      {isLoading ||
        (pageStart && (
          <>
            <LoadingAnimation
              otherClass="h-[80vh] bg-gray-100"
              classForSpinner="h-36 w-36"
              text="Verifying..."
            />
          </>
        ))}
      {isSuccess && (
        <>
          <div className="flex items-center justify-center h-[40vh] w-full flex-col gap-4">
            <div className="">
              <AlertComponent
                color="success"
                message="User is registered Successfully Please Login or sign up"
              />
            </div>
            <div onClick={() => navigate("/login")}>
              <SingleButton text="Login" otherClass="px-7 py-2" />
            </div>
          </div>
        </>
      )}
      {isError && (
        <>
          <div className="flex items-center justify-center h-[40vh] w-full flex-col gap-4">
            <div className="">
              <AlertComponent
                color="error"
                message="User is not Registered Successfully. Please Register again!"
              />
            </div>
            <div onClick={() => navigate("/register")}>
              <SingleButton text="RegisterAgain" otherClass="px-5 py-2" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyUser;
