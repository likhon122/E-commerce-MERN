import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons from react-icons library

const CarouselComponent = ({ slides, interval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [slides.length, interval]);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="">
      <div className="w-full flex justify-end ">
        <div className="relative w-full overflow-hidden md:mt-4 rounded-md">
          <div
            className="flex flex-row  transition transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className=" grow-0 shrink-0 basis-full">
                {slide}
              </div>
            ))}
          </div>
          {/* Left navigation button */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-buttonColor rounded-full p-1 focus:outline-none  border border-buttonColor hover:bg-buttonColor hover:text-white duration-300"
            onClick={goToPrevSlide}
          >
            <FaChevronLeft className="md:h-6 md:w-6" />
          </button>
          {/* Right navigation button */}
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2  text-buttonColor rounded-full p-1 focus:outline-none  border border-buttonColor hover:bg-buttonColor hover:text-white duration-300"
            onClick={goToNextSlide}
          >
            <FaChevronRight className="md:h-6 md:w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 lg:space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`lg:w-[10px] w-[7px] lg:h-[10px] h-[7px] rounded-full border border-buttonColor cursor-pointer ${
                  index === currentSlide ? "bg-buttonColor" : "bg-white"
                }`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;