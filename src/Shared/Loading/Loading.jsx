import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-72">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
