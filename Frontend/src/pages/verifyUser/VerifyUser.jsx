import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../../features/FetchProductData";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AlertComponent } from "../../components/keepReact/Alart";
import SingleButton from "../../components/Buttons/SingleButton";

const VerifyUser = () => {
  const params = useParams();
  const token = params.token;

  const navigate = useNavigate();
  const [verifyUser, { isLoading, isError, isSuccess }] =
    useVerifyUserMutation();

  const pageStart = isLoading || isError || isSuccess ? false : true;

  const verifyUserAccount = async () => {
    setTimeout(async () => {
      if (token) {
        console.log(token);
        const data = await verifyUser({ token });
        console.log(data);
      }
    }, 5000);
  };

  useEffect(() => {
    verifyUserAccount();
  }, []);

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
