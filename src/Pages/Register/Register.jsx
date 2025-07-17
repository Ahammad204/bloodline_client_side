import React, { useState } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import registerAnimation from "../../assets/register.json";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: null,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch districts
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/geocode/districts");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch upazilas
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas", selectedDistrictId],
    queryFn: async () => {
      const res = await axiosPublic.get("/geocode/upazilas");
      return res.data.filter((u) => u.district_id === selectedDistrictId);
    },
    enabled: !!selectedDistrictId,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      bloodGroup,
      district,
      upazila,
      avatar,
    } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Upload avatar
      const imageData = new FormData();
      imageData.append("image", avatar);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        imageData
      );
      const avatarUrl = imgbbRes.data.data.url;

      const userData = {
        name,
        email,
        password,
        bloodGroup,
        district,
        upazila,
        avatar: avatarUrl,
        role: "donor",
        status: "active",
      };

      const res = await register(userData);

      if (res?.status === 200 || res?.status === 201) {
        toast.success("Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          bloodGroup: "",
          district: "",
          upazila: "",
          avatar: null,
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center rounded-2xl p-6 md:p-12">
        <div>
          <Lottie animationData={registerAnimation} loop />
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-6 shadow rounded-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#D7263D]">
            Register To Bloodline
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="input input-bordered w-full"
          />

          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            accept="image/*"
            required
            className="file-input file-input-bordered w-full"
          />

          <select
            name="bloodGroup"
            onChange={handleChange}
            value={formData.bloodGroup}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="district"
            onChange={(e) => {
              handleChange(e);
              const selected = districts.find((d) => d.name === e.target.value);
              setSelectedDistrictId(selected?.id || "");
            }}
            value={formData.district}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            onChange={handleChange}
            value={formData.upazila}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="input input-bordered w-full"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full gradient-red">
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link className="text-[#D7263D] font-bold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
