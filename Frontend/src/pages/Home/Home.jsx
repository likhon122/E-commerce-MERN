/* eslint-disable no-unused-vars */

 import React, { useEffect } from 'react'

import Carousel from "./Carousel";

// import image1 from "../../../assets/images/index";
// import image2 from "../../../assets/images/index";
// import image3 from "../../../assets/images/index";

import axios from "axios"

const items = [
  <div key={1} className="w-full h-64 bg-gray-300">
    Item 1
  </div>,
  <div key={2} className="w-full h-64 bg-gray-400">
    Item 2
  </div>,
  <div key={3} className="w-full h-64 bg-gray-500">
    Item 3
  </div>
  // Add more items as needed
];
// const images = [{ path: image1 }, { path: image2 }, { path: image3 }];

const Home = () => {

  useEffect(() => {
    
    (async ()=> {
     const response = await axios.get("https://e-commerce-mern-zqx9.onrender.com/test");
     console.log(response.data)
    })()
  }, [])
  

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h1>Infinity Carousel Example</h1>
    // </div>
    // <Carousel interval={5000} />


    <div>Home</div>
  );
};

export default Home;
