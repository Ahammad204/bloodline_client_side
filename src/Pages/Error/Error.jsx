import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/404.json"; 

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
      {/* Lottie Animation */}
      <div className="w-full max-w-md mb-6">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* Text */}
      <h1 className="text-4xl font-bold text-[#D7263D] mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="btn gradient-red text-white hover:bg-[#b71c2c]"
      >
         Back to Home
      </button>
    </div>
  );
};

export default Error;
