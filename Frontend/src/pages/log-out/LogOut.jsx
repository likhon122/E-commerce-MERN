import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axiosApiFetch from "../../api/apiConfig";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../app/reducers/VerifyUserIsExist";

const LogOut = () => {
  const { isSuccess } = useSelector((state) => state.verifyUserIsExist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogOut = async () => {
    try {
      await axiosApiFetch.post("/auth/logout");
      dispatch(logOut());
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLogOut();
    if (isSuccess) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingAnimation otherClass="h-[100vh]" classForSpinner="w-32 h-32" />
    );
  }
  return <div>LogOut</div>;
};

export default LogOut;
