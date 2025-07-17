import React, { useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";

import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";



const Login = () => {
  // const { login } = useAuth();
  const {login} = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center rounded-2xl p-6 md:p-12">
        <div>
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="  p-6 shadow rounded-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#D7263D]">
            Login to Bloodline
          </h2>

          <div>
            <label className="block mb-1 font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formData.email}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full gradient-red">
            Login
          </button>

          <p className="text-sm text-center mt-4">
            New user? {" "}
            <Link to="/register" className="text-[#D7263D] font-semibold hover:underline">
               Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
