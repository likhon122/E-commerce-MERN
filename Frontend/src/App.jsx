// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Layout from "./Layout";
import Home from "./components/pages/Home/Home";
import Blog from "./components/pages/blog/Blog";
import Account from "./components/pages/account/Account";
import Cart from "./components/pages/cart/Cart";
import Wishlist from "./components/pages/wishlist/Wishlist";
import NotFound from "./components/pages/notFound/404NotFound";

function App() {
  // const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="account" element={<Account />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
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
