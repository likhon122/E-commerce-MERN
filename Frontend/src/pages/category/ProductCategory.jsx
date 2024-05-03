import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProductData } from "../../app/features/FindCategoryAccordingData";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductFilterNavbar from "../../components/Product/ProductFilterNavbar";
import ProductFilterSidebar from "../../components/Product/ProductFilterSidebar";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { AlertComponent } from "../../components/keepReact/Alart";
import { addCartItem } from "../../app/features/CartSlice";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryId = params.categoryId;

  const { products, isSuccess, isError, error, isLoading } = useSelector(
    (state) => state.findCategoryProduct
  );

  const { cartState } = useSelector((state) => state.cartItems);

  const {
    isSuccess: addToCartSuccess,
    isLoading: addToCartLoading,
    isError: addToCartError,
    error: addToCartErrorMessage
  } = cartState;

  const { userInfo } = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedAddToCart, setClickedAddToCart] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = (productId) => {
    setClickedAddToCart(true);
    if (!userInfo) {
      setIsLoggedIn(true);

      setTimeout(() => {
        setIsLoggedIn(false);
        navigate("/register");
      }, 4000);
    }

    dispatch(addCartItem({ userId: userInfo._id, productId }));

    setTimeout(() => {
      setClickedAddToCart(false);
    }, 3000);
  };

  const filter = useMemo(
    () => ({
      limit: 7,
      page: 1,
      categoryId
    }),
    [categoryId]
  );

  useEffect(() => {
    dispatch(fetchCategoryProductData(filter));
  }, [dispatch, filter]);

  if (isLoading) {
    return <LoadingAnimation text="Loading..." otherClass="h-[80vh]" />;
  }

  if (!products?.products) {
    return <div>Product Not Found</div>;
  }

  if (products.products) {
    return (
      <>
        <div className="mx-[10%] ">
          <div className=" right-10 mt-3 z-30 fixed">
            {isLoggedIn && (
              <AlertComponent
                color="primary"
                message="Please Register First and Login then use add to cart functionality"
              />
            )}
            {clickedAddToCart && !addToCartError && !isLoggedIn && (
              <AlertComponent
                color="success"
                message="Cart Added Successfully"
              />
            )}
            {addToCartError && clickedAddToCart && !isLoggedIn && (
              <AlertComponent color="error" message={addToCartErrorMessage} />
            )}
          </div>
          <div>
            <div>
              <ProductFilterSidebar />
            </div>
            <div>
              <div>
                <ProductFilterNavbar
                  totalProducts={products.pagination.totalProduct}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 md:my-10 my-3">
                {products?.products.map((product) => {
                  const {
                    name,
                    _id,
                    slug,
                    image,
                    description,
                    regularPrice,
                    price,
                    quantity,
                    sold,
                    percentOff
                  } = product;
                  return (
                    <article
                      key={_id}
                      className="flex flex-col  bg-white rounded-md overflow-hidden  shadow-md hover:shadow-2xLarge duration-200 relative"
                    >
                      <div className="p-3 flex flex-col gap-1 justify-between h-full">
                        <div className="relative overflow-hidden ">
                          <Link to={`/product-details/${slug}`}>
                            <img
                              src={image}
                              alt="Product Image"
                              className="object-cover w-full h-auto max-h-[300px] min-h-[300px] transition-transform duration-300 transform hover:scale-125 cursor-pointer rounded-md"
                            />
                          </Link>
                        </div>
                        <div>
                          <Link to={`/product-details/${slug}`}>
                            <h1 className="mt-2 ">
                              Name:{" "}
                              <span className="font-medium  underline cursor-pointer hover:text-buttonColor">
                                {name.length > 62
                                  ? name.slice(0, 62) + "..."
                                  : name}
                              </span>
                            </h1>
                          </Link>

                          <div>
                            <p>
                              Description:{" "}
                              {description.length > 80 ? (
                                <span className=" text-gray-600 font-medium text-[15px]">
                                  {description.slice(0, 80)}
                                  <Link to={`/product-details/${slug}`}>
                                    <span className="text-buttonColor underline cursor-pointer">
                                      ...Read more
                                    </span>
                                  </Link>
                                </span>
                              ) : (
                                description
                              )}
                            </p>
                          </div>

                          <div>
                            Price:{" "}
                            <span className="line-through font-semibold text-gray-400">
                              {regularPrice}
                            </span>{" "}
                            <span className="font-semibold text-black text-[17px]">
                              {price} Tk.
                            </span>
                          </div>
                          <p>Quantity: {quantity - sold}</p>
                          <div className="flex gap-1">
                            Stock:
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
                        <div className="">
                          <div className="flex flex-col  ">
                            <div
                              className=""
                              onClick={() => handleAddToCart(_id)}
                            >
                              <button
                                className="font-medium bg-white border border-blue-500 py-1 px-2 text-center rounded-lg w-full cursor-pointer hover:bg-blue-500 hover:text-white duration-300 mt-2 text-blue-500 disabled:cursor-not-allowed"
                                disabled={addToCartLoading}
                              >
                                Add To Cart
                              </button>
                            </div>
                            <div className="bg-buttonColor border border-borderColor py-1 px-2 text-center rounded-lg w-full cursor-pointer hover:bg-white t hover:text-buttonColor duration-300 mt-2 text-white">
                              <Link className="font-medium">Buy Now</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bg-green-300 rounded-ee-md">
                        <p className="text-sm">Save: {percentOff}%</p>
                        <p className="text-sm">
                          Sold: {sold}/{quantity}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductCategory;
