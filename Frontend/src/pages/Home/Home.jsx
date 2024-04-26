/* eslint-disable no-unused-vars */

import React from "react";
import CarouselComponent from "../../components/keepReact/Carousel";
import {
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
  sliderImage6
} from "../..";
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

        <div className="mt-8 py-7 border-t-2 border-gray-300">
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
                <div>
                  <div>
                    <h1>Fashion</h1>
                  </div>
                  <div>
                    <div>
                      <div>
                        <h1>Fashion For Men</h1>
                      </div>
                      <div>
                        <div>
                          <h1>Top Wear</h1>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1>Fashion For Women</h1>
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
