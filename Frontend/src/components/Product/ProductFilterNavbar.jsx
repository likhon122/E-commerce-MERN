import React from "react";

import { FaFilter } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";

const ProductFilterNavbar = ({ totalProducts = 0 }) => {
  return (
    <div className="md:mb-5 mt-2">
      <div className="flex justify-between md:px-10 px-2 bg-white py-1 rounded-md items-center">
        <div className="flex gap-2 items-center">
          <div className="bg-buttonColor border-buttonColor border p-1 rounded-md cursor-pointer hover:bg-white duration-500 group">
            <FaFilter
              size={18}
              className="group-hover:text-buttonColor text-white"
            />
          </div>
          <div className="md:block hidden">
            <p className=" text-buttonColor">
              We found {totalProducts} items for you!
            </p>
          </div>
        </div>
        <div className="bg-red-100 px-1 py-1 rounded-md flex md:gap-2">
          <label htmlFor="shortProduct">Short By:</label>
          <select
            name="shortProduct"
            id="shortProduct"
            className="hover:cursor-pointer rounded-md"
          >
            <option value="">New Product</option>
            <option value="">Old Product</option>
            <option value="">Top Rated</option>
          </select>
        </div>
      </div>
      <div>
        <div className="md:hidden mt-2 ">
          <p className=" text-buttonColor text-sm">
            We found {totalProducts} items for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNavbar;
