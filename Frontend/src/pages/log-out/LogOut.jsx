import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../app/features/AuthSlice";

const LogOut = () => {
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logOutUser());
    navigate("/");
  };

  useEffect(() => {
    handleLogOut();
    if (!isLoggedIn) {
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
