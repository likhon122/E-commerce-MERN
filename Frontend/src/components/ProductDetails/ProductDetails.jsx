import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../app/features/ProductSlice";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { TiInfoOutline } from "react-icons/ti";

const ProductDetails = () => {
  const { product, isLoading, isError, Error } = useSelector(
    (state) => state.findSingleProduct
  );
  const params = useParams();
  const dispatch = useDispatch();

  const productName = params.slug;

  useEffect(() => {
    if (productName) {
      dispatch(fetchSingleProduct(productName));
    }
  }, [dispatch, productName]);

  if (isLoading) {
    return <LoadingAnimation otherClass="h-[80vh]" />;
  }

  if (isError) {
    return (
      <h1>
        Something went Wrong! This product is not available right now for you!
      </h1>
    );
  }

  if (product) {
    const {
      name,
      description,
      regularPrice,
      percentOff,
      price,
      sold,
      quantity,
      image,
      shipping
    } = product;

    return (
      <>
        <div className="mx-[10%]">
          <div className="mt-3 md:mt-10  md:mb-10 mb-3">
            <div className="grid lg:grid-cols-[45%_minmax(0px,_1fr)] xl:grid-cols-[35%_minmax(0px,_1fr)] md:grid-cols-[45%_minmax(0px,_1fr)] lg:gap-7 md:gap-3 xl:gap-10 gap-3">
              <div className="flex flex-col gap-3 ">
                <div className="bg-[#F5F5F5] p-4 rounded-md shadow-md">
                  <img
                    src={image}
                    alt="product-image"
                    className="min-w-[100%] h-auto"
                  />
                </div>
                <div className="flex gap-3 justify-center ">
                  <div className="max-w-[33%] p-2 bg-[#F5F5F5] rounded-md shadow-md">
                    <img src={image} alt="product-image" className="" />
                  </div>
                  <div className="max-w-[33%] p-2 bg-[#F5F5F5] rounded-md shadow-md">
                    <img src={image} alt="product-image" className="" />
                  </div>
                  <div className="max-w-[33%] p-2 bg-[#F5F5F5] rounded-md shadow-md">
                    <img src={image} alt="product-image" className="" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md p-[20px]">
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-600">
                      {name}
                    </h1>
                    <div className="flex gap-3 mt-2">
                      <div className="border-r-2 pr-2 border-red-400">
                        <h1>Review Coming Soon!</h1>
                      </div>
                      <div>
                        {quantity - sold > 0 ? (
                          <p className="bg-green-300 px-[5px] rounded-md">
                            In Stock order Now!
                          </p>
                        ) : (
                          <p className="bg-red-200 px-[5px] rounded-md">
                            Out Of stock
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex gap-3">
                        <p className="line-through text-xl font-semibold text-gray-400">
                          {regularPrice} Tk.
                        </p>
                        <p className="text-xl text-gray-700 font-semibold">
                          {price}Tk.
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">
                          Off: {percentOff}%
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-green-600">
                          Save: {Math.floor(regularPrice - price)}TK.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="h-7 w-[5px] bg-buttonColor rounded-md"></div>
                        <p>Product Details</p>
                      </div>
                      <p className="text-[15px] text-gray-500 mb-2">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">Colors Coming Soon!</div>
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-500">
                          Size:{" "}
                        </p>
                        <div className="flex gap-3 items-center">
                          <div className="h-7 w-7 bg-white border-[1.5px] hover:bg-buttonColor duration-300 border-buttonColor flex items-center justify-center cursor-pointer rounded-md hover:text-white">
                            <p>XS</p>
                          </div>
                          <div className="h-7 w-7 bg-white border-[1.5px] hover:bg-buttonColor duration-300 border-buttonColor flex items-center justify-center cursor-pointer rounded-md hover:text-white">
                            <p>S</p>
                          </div>
                          <div className="h-7 w-7 bg-white border-[1.5px] hover:bg-buttonColor duration-300 border-buttonColor flex items-center justify-center cursor-pointer rounded-md hover:text-white">
                            <p>M</p>
                          </div>
                          <div className="h-7 w-7 bg-white border-[1.5px] hover:bg-buttonColor duration-300 border-buttonColor flex items-center justify-center cursor-pointer rounded-md hover:text-white">
                            <p>XL</p>
                          </div>
                          <div className="h-7 w-9 bg-white border-[1.5px] hover:bg-buttonColor duration-300 border-buttonColor flex items-center justify-center cursor-pointer rounded-md hover:text-white">
                            <p>XXL</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center mt-3 mb-3">
                      <div className="flex items-center">
                        <div className="border border-buttonColor  cursor-pointer h-8 flex items-center justify-center w-8 group hover:bg-buttonColor duration-300 rounded-s-md">
                          <FiMinus className="text-buttonColor text-[18px] group-hover:text-white" />
                        </div>
                        <div className="border-y border-buttonColor h-8 flex items-center justify-center w-16">
                          <p className="text-lg font-semibold text-gray-600">
                            0
                          </p>
                        </div>

                        <div className="border border-buttonColor h-8 flex items-center justify-center w-8 group hover:bg-buttonColor duration-300 rounded-e-md cursor-pointer">
                          <GoPlus className="text-buttonColor text-[18px] group-hover:text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-[34px] flex items-center justify-center bg-white border-[1.5px] border-buttonColor w-8 rounded-md cursor-pointer ">
                          <div className="group duration-500">
                            <IoMdHeartEmpty
                              size={24}
                              className="text-buttonColor group-hover:hidden duration-500"
                            />
                            <IoMdHeart
                              className="group-hover:block hidden duration-500 text-buttonColor"
                              size={24}
                            />
                          </div>
                        </div>
                        <p className=" text-buttonColor font-medium">
                          Add to favourite
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-6">
                    <div>
                      <button className="border border-buttonColor h-[35px] w-[110px] rounded-md text-white bg-buttonColor hover:bg-white hover:text-buttonColor duration-500">
                        Buy Now
                      </button>
                    </div>
                    <div>
                      <button className="border border-blue-500 h-[35px] w-[110px] rounded-md text-blue-500 bg-white hover:bg-blue-500 hover:text-white duration-500 ">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <div className="bg-[#F5F5F5] p-2 border-2 rounded-md ease-in-out cursor-pointer grid grid-cols-[15%_minmax(0px,_1fr)] gap-4 items-center hover:border-buttonColor group duration-200">
                      <div className="flex items-center justify-center">
                        <TbTruckDelivery size={35} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-500">
                          Free Delivery
                        </h3>
                        <p className="text-[15px] text-gray-500 underline cursor-pointer group-hover:text-buttonColor">
                          Enter your postal code for Delivery availability
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#F5F5F5] p-2 border-2 rounded-md ease-in-out cursor-pointer grid grid-cols-[15%_minmax(0px,_1fr)] gap-4 items-center hover:border-buttonColor group duration-200  min-h-[95px] xl:min-w-[410px] ">
                      <div className="flex items-center justify-center">
                        <GrUpdate size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-500">
                          Return Delivery
                        </h3>
                        <p className="text-[15px] text-gray-500 underline cursor-pointer group-hover:text-buttonColor">
                          Free 30 Days Delivery Returns. Details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductDetails;
