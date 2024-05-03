// import React from 'react'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addCartItem,
  decreaseCartItem,
  deleteCartItem,
  fetchCartItems
} from "../../app/features/CartSlice";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import SpinnerComponent from "../../components/keepReact/Spinner";
import { AlertComponent } from "../../components/keepReact/Alart";

const Cart = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  const { products, isLoading, cartState, deleteCartState } = useSelector(
    (state) => state.cartItems
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [userIdStore, setUserIdStore] = useState(userId);

  const [clickDeleteButton, setClickDeleteButton] = useState(false);

  useEffect(() => {
    // dispatch(fetchCartItems(userIdStore));
  }, [dispatch, userIdStore]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/register");
    }
  }, [dispatch, userInfo, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const HandleDeleteCartItem = ({ cartId, itemId }) => {
    setClickDeleteButton(true);
    dispatch(deleteCartItem({ cartId, itemId }));

    setTimeout(() => {
      setClickDeleteButton(false);
    }, 3000);
  };

  const handleAddToCart = (productId) => {
    dispatch(addCartItem({ userId: userInfo._id, productId }));
  };

  const handleDecreaseCartItem = (productId) => {
    dispatch(
      decreaseCartItem({ userId: userInfo._id, productId, cartQuantity: -1 })
    );
  };

  if (isLoading) {
    return (
      <LoadingAnimation otherClass="h-[80vh]" classForSpinner="w-32 h-32" />
    );
  }

  let subTotal = 0;

  let totalSave = 0;

  let shippingCharge = 0;
  let total = 0;

  if (products?.items) {
    return (
      <div>
        <div className="md:mx-[10%] mx-[8%] py-3 min-h-[70vh]">
          <div className=" right-10 mt-3 z-30 fixed">
            {clickDeleteButton && (
              <AlertComponent
                color="success"
                message="Cart Product is Deleted Successfully"
              />
            )}
            {clickDeleteButton && deleteCartState.error && (
              <AlertComponent
                color="error"
                message="Cart Product is not deleted! Something is wrong!"
              />
            )}
          </div>
          <div className="text-center">
            {products.items.length > 0 ? (
              <div className="md:grid md:grid-cols-5 grid-cols-4 flex justify-between px-1 bg-white md:p-2 rounded-lg py-4 px-6 shadow-lg shadow-gray-300 font-semibold md:text-[17px] text-[12px] ">
                <p className="">Product</p>
                <p className="">Price</p>
                <p className="">Quantity</p>
                <p className="">Subtotal</p>
                <p className="hidden md:block ">Delete</p>
              </div>
            ) : (
              ""
            )}
            {products.items.map((item) => {
              const itemId = item._id;
              const { cartQuantity } = item;
              const {
                name,
                price,
                image,
                _id,
                regularPrice,
                shipping,
                percentOff
              } = item.productId;

              let save = regularPrice * cartQuantity - price * cartQuantity;

              shippingCharge = shipping;

              totalSave = totalSave + save;

              subTotal = regularPrice * cartQuantity + subTotal;
              total = price * cartQuantity + subTotal;

              return (
                <div
                  className="grid md:grid-cols-5 grid-cols-4  justify-center bg-white p-2 rounded-lg py-4 md:px-6 px-2  shadow-lg shadow-gray-300 my-3 relative overflow-hidden"
                  key={_id}
                >
                  <div className="absolute bg-buttonColor lg:rounded-bl-md p-[2px] lg:right-0 text-white text-[11px] rounded-br-md">
                    <div className="flex items-start justify-start flex-col">
                      <p>{percentOff}% off</p>
                      <div className="flex gap-1">
                        <p>Save: </p>
                        {_id === cartState.productId && cartState.isLoading ? (
                          <SpinnerComponent extraClass="h-4 w-4 mr-1 border-white" />
                        ) : (
                          <span className="line-through">
                            {Math.floor(save)} Tk
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <div>
                      <img
                        src={image}
                        alt="Img"
                        className="max-w-full max-h-full w-16 h-16"
                      />
                    </div>
                    <div className="flex  items-center ">
                      <p className="text-[13px]">{name.slice(0, 30)}...</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center text-[14px] md:text-[16px] font-medium">
                    {price}{" "}
                    <span className="text-[13px] md:text-base"> Tk</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="flex gap-3 font-[15px] bg-gray-200 md:px-2 md:py-1 py-1 px-1 rounded-md">
                      <button
                        disabled={cartState.isLoading}
                        onClick={() => handleDecreaseCartItem(_id)}
                      >
                        -
                      </button>

                      <div>
                        {_id === cartState.productId && cartState.isLoading ? (
                          <SpinnerComponent size="sm" />
                        ) : (
                          cartQuantity
                        )}
                      </div>
                      <button
                        onClick={() => {
                          handleAddToCart(_id);
                        }}
                        disabled={cartState.isLoading}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center ">
                    <p>
                      {_id === cartState.productId && cartState.isLoading ? (
                        <SpinnerComponent extraClass="h-5 w-5" />
                      ) : (
                        <span className="text-[14px] md:text-[16px] font-medium">
                          {Math.floor(price * cartQuantity)}{" "}
                          <span className="text-[13px] md:text-base"> Tk</span>
                        </span>
                      )}
                    </p>
                  </div>

                  <div className=" md:hidden flex w-full absolute mx-[50%] bottom-[10px]">
                    <button
                      className="text-[15px] p-1 bg-transparent rounded-md text-buttonColor border-2 border-buttonColor hover:bg-buttonColor hover:text-white duration-500"
                      onClick={() =>
                        HandleDeleteCartItem({ cartId: products._id, itemId })
                      }
                    >
                      Delete
                    </button>
                  </div>

                  <div className="md:flex justify-center items-center hidden">
                    <button
                      className="text-[15px] p-1 bg-transparent rounded-md text-buttonColor border-2 border-buttonColor hover:bg-buttonColor hover:text-white duration-500"
                      onClick={() =>
                        HandleDeleteCartItem({ cartId: products._id, itemId })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            {products.items.length > 0 ? (
              <div className="mx-6 mt-3 ">
                <div className="flex justify-between">
                  <button
                    className="w-[140px] px-2 py-2 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300"
                    onClick={handleBack}
                  >
                    Return to Shop
                  </button>
                  <button
                    className="w-[140px] px-2 py-2 bg-transparent rounded-md text-buttonColor border-2 border-buttonColor hover:bg-buttonColor hover:text-white duration-500"
                    // onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                </div>
                <div>
                  <div className="mt-10 flex justify-between px-6">
                    <div></div>
                    <div className="flex flex-col border-2 border-gray-400 p-3 w-[30%] -mt-1 rounded">
                      <h3 className="text-[17px] font-semibold text-center">
                        Cart Total
                      </h3>
                      <div>
                        <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                          <p className="text-[17px] font-mono">Total Save:</p>
                          <p className="text-[17px] font-mono">
                            {cartState.isLoading ? (
                              <SpinnerComponent extraClass="h-6 w-6 border-buttonColor" />
                            ) : (
                              <span>{Math.floor(totalSave)} Tk</span>
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                          <p className="text-[17px] font-mono">With out Off:</p>
                          <p className="text-[17px] font-mono">
                            {cartState.isLoading ? (
                              <SpinnerComponent extraClass="h-6 w-6 border-buttonColor" />
                            ) : (
                              <span>{Math.floor(subTotal)} Tk</span>
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                          <p className="text-[17px] font-mono">Shipping:</p>
                          <p className="text-[17px] font-mono">
                            {shippingCharge} Tk
                          </p>
                        </div>
                        <div className="flex justify-between mx-3 my-3 border-b-2 border-gray-300 py-1">
                          <p className="text-[17px] font-mono">Total:</p>
                          <p className="text-[17px] font-mono">
                            {cartState.isLoading ? (
                              <SpinnerComponent extraClass="h-6 w-6 border-buttonColor" />
                            ) : (
                              <span>{Math.floor(total)} Tk</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 mb-1">
                        <Link
                          to={"/checkOut"}
                          className="px-2 py-2 bg-buttonColor rounded-md text-white border-2 border-buttonColor hover:bg-transparent hover:text-buttonColor duration-300"
                        >
                          Process To Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-7">
                <div className="flex justify-center bg-[#F8F8F8] ">
                  <img
                    // src={emptyCardImage}
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
    );
  }

  if (!products) {
    return (
      <div className="my-7 mx-[10%]">
        <div className="flex justify-center bg-[#F8F8F8] ">
          <img
            // src={emptyCardImage}
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
    );
  }
};

export default Cart;
