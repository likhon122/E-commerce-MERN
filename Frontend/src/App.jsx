import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./App.css";

import Layout from "./Layout";
import { Account, Blog, Cart, Home, NotFound, Wishlist } from "./index";
import Products from "./pages/products/Products";
import Login from "./pages/account/Login";
import VerifyUser from "./pages/verifyUser/VerifyUser";
import LogOut from "./pages/log-out/LogOut";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import { verifyUserIsExist } from "./app/reducers/VerifyUserIsExist";
import axiosApiFetch from "./api/apiConfig";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axiosApiFetch.get("/auth/refresh-token");
        const userInfo = await axiosApiFetch.get("/auth/protected");
        console.log(userInfo);
        if (userInfo.data.payload && userInfo.data.payload.user) {
          console.log("dispatch ");
          dispatch(
            verifyUserIsExist({
              userInfo: userInfo.data.payload.user
            })
          );
        }
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log(error);
      }
    })();
  }, []);

  if (isFetching) {
    return (
      <LoadingAnimation otherClass="h-[100vh]" classForSpinner="w-32 h-32" />
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="register" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="products" element={<Products />} />
        <Route path="api/users/verify/:token" element={<VerifyUser />} />
        <Route
          path="api/users/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="log-out" element={<LogOut />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
