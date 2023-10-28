import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";

const InitialPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Redirect to Solving Page after 5 seconds
    navigate("/solving"); // Redirect to SolvingPage component
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={logo} alt="Rapidata Logo" className="w-32 mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        Welcome to Rapidata Bounding Box Tool
      </h1>
      <p className="text-gray-600 mb-4">
        Follow the instructions to label the car's bounding box.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        onClick={() => handleStartClick()}
      >
        Start
      </button>
    </div>
  );
};

export default InitialPage;
