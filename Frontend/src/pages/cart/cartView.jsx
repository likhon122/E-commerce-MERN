import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { cartAddItem } from "./CartSlice";

import emptyCardImage from "/Images/emptyCardImage.png";
import {
  cartTotals,
  clearCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeCartItem
} from "./CartSlice";

const CartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const items = useSelector((state) => state.cart.cartItems);
  const cartPrice = useSelector((state) => state.cart.cartTotoalAmount);
  useEffect(() => {
    dispatch(cartTotals());
  }, [items, dispatch]);
  const handleClick = (id) => {
    dispatch(removeCartItem(id));
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="mx-[10%] m-auto py-3 min-h-[70vh]">
        <div className="text-center">
          {items.length > 0 ? (
            <div className="grid grid-cols-5 justify-center bg-gray-200 p-2 rounded-lg py-4 px-6 shadow-lg shadow-gray-300">
              <p className="font-semibold text-[17px]">Product</p>
              <p className="font-semibold text-[17px]">Price</p>
              <p className="font-semibold text-[17px]">Quantity</p>
              <p className="font-semibold text-[17px]">Subtotal</p>
              <p className="font-semibold text-[17px]">Delete</p>
            </div>
          ) : (
            ""
          )}
          {items &&
            items.map((item, index) => {
              const { brandName, cardQuantity, currentprice, image, name, id } =
                item;
              return (
                <div
                  className="grid grid-cols-5 justify-center bg-white p-2 rounded-lg py-4 px-6 shadow-lg shadow-gray-300 my-3"
                  key={index}
                >
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src={image}
                      alt="Img"
                      className="max-w-full max-h-full w-16 h-16"
                    />
                    <p className="text-[13px]">{name}</p>
                  </div>
                  <p className="flex justify-center items-center">
                    {parseFloat(currentprice).toLocaleString("en-UN")} Tk
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="flex gap-3 font-[15px] bg-gray-200 px-2 py-1 rounded-md">
                      <button
                        onClick={() => dispatch(decreaseCartQuantity(item))}
                      >
                        -
                      </button>
                      <p>{cardQuantity}</p>
                      <button
                        onClick={() => dispatch(increaseCartQuantity(item))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center ">
                    <p>
                      {parseFloat(currentprice * cardQuantity).toLocaleString(
                        "en-UN"
                      )}{" "}
                      Tk
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="w-[90px] px-1 py-2 bg-transparent rounded-md text-buttonColor border-2 border-buttonColor hover:bg-buttonColor hover:text-white duration-500"
                      onClick={() => handleClick(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          <div>
            {items.length > 0 ? (
              <div className="flex justify-between mx-6 mt-3 ">
                <button
                  className="w-[140px] px-2 py-2 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300"
                  onClick={handleBack}
                >
                  Return to Shop
                </button>
                <button
                  className="w-[140px] px-2 py-2 bg-transparent rounded-md text-buttonColor border-2 border-buttonColor hover:bg-buttonColor hover:text-white duration-500"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            ) : (
              ""
            )}
            {products.items.length > 0 ? (
              <div className="mt-10 flex justify-between px-6">
                <div>
                  <input
                    type="text"
                    name="cupon"
                    id="cupon"
                    className="outline-none border-2 border-gray-400 w-[250px] px-2 py-1 rounded-md"
                  />
                  <button className="w-[120px] px-1 py-1 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300 ml-[1px]">
                    Apply Cupon
                  </button>
                </div>
                <div className="flex flex-col border-2 border-gray-400 p-3 w-[30%] -mt-1 rounded">
                  <h3 className="text-[17px] font-semibold text-center">
                    Cart Total
                  </h3>
                  <div>
                    <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                      <p className="text-[17px] font-mono">Subtotal:</p>
                      <p className="text-[17px] font-mono">{cartPrice} Tk</p>
                    </div>
                    <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                      <p className="text-[17px] font-mono">Shipping:</p>
                      <p className="text-[17px] font-mono">Free</p>
                    </div>
                    <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                      <p className="text-[17px] font-mono">Total:</p>
                      <p className="text-[17px] font-mono">{cartPrice} Tk</p>
                    </div>
                  </div>
                  <div className="mt-2 mb-1">
                    <button className="px-2 py-2 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300">
                      Process To Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-7">
                <div className="flex justify-center bg-[#F8F8F8] ">
                  <img
                    src={emptyCardImage}
                    alt="emptyImage"
                    className="w-[30%] h-[40vh] bg-cover bg-no-repeat bg-center"
                  />
                </div>
                <div className="flex justify-between mx-6 mt-5 ">
                  <button
                    className="w-[140px] px-2 py-2 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300"
                    onClick={handleBack}
                  >
                    Return to Shop
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
