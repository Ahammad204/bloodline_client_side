import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import bloodDonateAnimation from "../../assets/banner.json"; 

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] grid md:grid-cols-2 items-center gap-10 px-4 md:px-20 ">
      {/* Left: Lottie animation */}
      <div>
        <Lottie animationData={bloodDonateAnimation} loop={true} />
      </div>

      {/* Right: Text + Buttons */}
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D7263D]">
          Save Lives, <br /> Become a Blood Donor Today!
        </h1>

        <div className="flex gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigate("/register")}
            className="btn gradient-red text-white hover:bg-[#b71c2c]"
          >
            Join as a Donor
          </button>
          <button
            onClick={() => navigate("/Search")}
            className="btn bg-[#b71c2c] text-white hover:bg-[#D7263D]"
          >
            Search Donors
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
