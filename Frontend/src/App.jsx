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

function App() {
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
