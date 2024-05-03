import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import Layout from "./Layout";
import { Account, Blog, Cart, Home, NotFound, Wishlist } from "./index";
import Products from "./pages/products/Products";
import Login from "./pages/account/Login";
import VerifyUser from "./pages/verifyUser/VerifyUser";
import LogOut from "./pages/log-out/LogOut";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import { verifyUserIsExist } from "./app/features/AuthSlice";
import Profile from "./pages/account/profile/Profile";
import ProductCategory from "./pages/category/ProductCategory";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import { fetchCartItems } from "./app/features/CartSlice";
import CheckOut from "./pages/checkOut/CheckOut";

function App() {
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(verifyUserIsExist());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCartItems(userInfo._id));
    }
  }, [dispatch, userInfo]);

  if (isLoading) {
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
        <Route path="cart/:userId" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="products" element={<Products />} />
        <Route path="api/users/verify/:token" element={<VerifyUser />} />
        <Route
          path="api/users/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="log-out" element={<LogOut />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="category/:categoryId" element={<ProductCategory />} />
        <Route path="product-details/:slug" element={<ProductDetails />} />
        <Route path="checkOut" element={<CheckOut />} />
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
