import React, { useState, useEffect } from "react";

const Carousel = ({ interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    "https://www.freestufffinder.com/wp-content/uploads/2023/10/Hersheys-Full-Size-Variety-Pack-30-Count-in-Store.jpg",
    "https://picsum.photos/1200/600?random=2",
    "https://picsum.photos/1200/600?random=3",
    "https://picsum.photos/1200/600?random=4"
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const timer = setInterval(goToNextSlide, interval);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, interval]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlePausePlayClick = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <div className="relative w-full overflow-hidden md:z-0">
      <div className="flex">
        <div className="flex-none">
          <button
            className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-12 h-full bg-black bg-opacity-50 text-white focus:outline-none"
            onClick={goToPrevSlide}
          >
            &lt;
          </button>
        </div>
        <div className="flex-grow overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-[550px]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-none">
          <button
            className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-12 h-full bg-black bg-opacity-50 text-white focus:outline-none"
            onClick={goToNextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-black bg-opacity-50">
        <button
          className="text-white focus:outline-none"
          onClick={handlePausePlayClick}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
