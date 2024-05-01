/* eslint-disable no-unused-vars */

import React from "react";
import CarouselComponent from "../../components/keepReact/Carousel";
import {
  menPant,
  menShirt,
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
  sliderImage6,
  womenPant,
  womenShirt
} from "../..";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategoryProductData } from "../../app/features/FindCategoryAccordingData";
const Home = () => {
  const slides = [
    <div key={1}>
      <img
        src={sliderImage1}
        alt="Slide 1"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>,
    <div key={2}>
      <img
        src={sliderImage2}
        alt="Slide 2"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>,
    <div key={3}>
      <img
        src={sliderImage3}
        alt="Slide 3"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>,
    <div key={4}>
      <img
        src={sliderImage4}
        alt="Slide 3"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>,
    <div key={5}>
      <img
        src={sliderImage5}
        alt="Slide 3"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>,
    <div key={6}>
      <img
        src={sliderImage6}
        alt="Slide 3"
        className="w-full xl:h-[400px] lg:h-[320px] md:h-[280px] h-[220px]"
      />
    </div>
  ];

  const dispatch = useDispatch();

  return (
    <div className="min-h-[80vh] md:mx-[10%]">
      <div>
        <div className="grid lg:grid-cols-[22%_minmax(0px,_1fr)] md:grid-cols-[24%_minmax(0px,_1fr)] lg:gap-7 md:gap-3">
          <div className="hidden md:block">
            <div>
              <div>
                <h1>Coming Soon</h1>
              </div>
            </div>
          </div>
          <div>
            <CarouselComponent slides={slides} interval={5000} />
          </div>
        </div>

        <div className="mt-8 py-7 border-t-2 border-gray-300 mx-[10%] md:mx-0">
          <div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-4 bg-buttonColor rounded-md"></div>
                  <h1 className="text-sm text-buttonColor font-medium">
                    Categories
                  </h1>
                </div>
                <div>
                  <h1 className="text-2xl font-medium my-2 ">
                    Browse By Category
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-4 mt-5">
                  <div className="grid lg:grid-cols-[15%_minmax(0px,_1fr)] md:grid-cols-[24%_minmax(0px,_1fr)] lg:gap-7 md:gap-3 gap-3">
                    <div className="flex items-center gap-1">
                      <div className="h-10 w-2 bg-buttonColor rounded-md"></div>
                      <h1 className="text-buttonColor">Fashion For Men</h1>
                    </div>
                    <div className="flex gap-7">
                      <Link to={"/category/662e139e39bd8b2213217707"}>
                        <div className="flex flex-col bg-white md:h-[120px] h-[110px] md:w-[120px] w-[110px] p-2 items-center justify-center rounded-lg cursor-pointer hover:bg-buttonColor hover:text-white duration-500 shadow-md">
                          <div>
                            <img
                              src={menShirt}
                              alt="menShirt"
                              className="md:h-14 md:w-14 h-10 w-10 "
                            />
                          </div>
                          <h1 className="text-sm md:text-base">Top Wear</h1>
                        </div>
                      </Link>
                      <Link to={"/category/662e13c039bd8b221321770b"}>
                        <div className="flex flex-col bg-white md:h-[120px] h-[110px] md:w-[120px] w-[110px] p-2 items-center justify-center rounded-lg cursor-pointer hover:bg-buttonColor hover:text-white duration-500 shadow-md ">
                          <div>
                            <img
                              src={menPant}
                              alt="menShirt"
                              className="md:h-14 md:w-14 h-10 w-10"
                            />
                          </div>
                          <h1 className="text-sm md:text-base">Bottom wear</h1>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-[15%_minmax(0px,_1fr)] md:grid-cols-[24%_minmax(0px,_1fr)] lg:gap-7 md:gap-3 gap-3 border-t-2 border-orange-200 pt-3">
                    <div className="flex items-center gap-1">
                      <div className="h-10 w-2 bg-buttonColor rounded-md"></div>
                      <h1 className="text-buttonColor">Fashion For Women</h1>
                    </div>
                    <div className="flex gap-7">
                      <Link to={"/category/662e13ab39bd8b2213217709"}>
                        <div className="flex flex-col bg-white md:h-[120px] h-[110px] md:w-[120px] w-[110px] p-2 items-center justify-center rounded-lg cursor-pointer hover:bg-buttonColor hover:text-white duration-500 shadow-md">
                          <div>
                            <img
                              src={womenShirt}
                              alt="menShirt"
                              className="md:h-14 md:w-14 h-10 w-10"
                            />
                          </div>
                          <h1 className="text-sm md:text-base">Top Wear</h1>
                        </div>
                      </Link>
                      <Link to={"/category/662e13c639bd8b221321770d"}>
                        <div className="flex flex-col bg-white md:h-[120px] h-[110px] md:w-[120px] w-[110px] p-2 items-center justify-center rounded-lg cursor-pointer hover:bg-buttonColor hover:text-white duration-500 shadow-md ">
                          <div>
                            <img
                              src={womenPant}
                              alt="menShirt"
                              className="md:h-14 md:w-14 h-10 w-10 "
                            />
                          </div>
                          <h1 className="text-sm md:text-base">Bottom wear</h1>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
