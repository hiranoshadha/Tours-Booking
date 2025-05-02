import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/background1.webp";
// import logo from '../assets/Logo.png';
// import Logo from '../components/Logo/Logo';
import Logo from "../assets/K_5.mp4";
import "../components/Logo/Logo.css";
import Transition from "../components/Transition";

const coverpage = () => {
  const navigate = useNavigate();

  const handleLoginTransition = () => {
    navigate("/login"); // Trigger transition to login page
  };

  return (
    <Transition direction="top">
      {" "}
      {/* Slide in from top */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-10  text-center">
            {/* <img
            src={logo}
            alt="Flamingo Tours Logo"
            className="w-40 h-40 rounded-full mb-6 mx-auto shadow-lg"
          /> */}
            {/* <div className="p-8 flex items-center justify-center">
            <Logo/>
          </div> */}
          <div className="flex w-full items-center justify-center  text-center">
            <div className="logo-container1">
              {/* Video as the Logo */}
              <video autoPlay muted className="logo-video">
                <source src={Logo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            </div>
            {/* <h1 className="text-4xl font-bold mb-4">Flamingo Tours</h1> */}
            <p className="text-xl text-white mb-6 mt-10 text-center">
              Your gateway to unforgettable travel experiences.
            </p>
            <button
              onClick={handleLoginTransition}
              className="bg-orange-500 hover:bg-orange-400 px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default coverpage;
