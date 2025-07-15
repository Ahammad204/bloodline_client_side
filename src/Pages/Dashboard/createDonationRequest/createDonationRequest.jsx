import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/UseAuth";
import axiosPublic from "../../../utils/axiosPublic";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [formData, setFormData] = useState({
    requesterName: user?.name || "",
    requesterEmail: user?.email || "",
    recipientName: "",
    district: "",
    upazila: "",
    hospitalName: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    axiosPublic.get("/geocode/districts").then((res) => setDistricts(res.data));
    axiosPublic.get("/geocode/upazilas").then((res) => setUpazilas(res.data));
  }, []);

  useEffect(() => {
    const selected = districts.find((d) => d.name === formData.district);
    if (selected) {
      const filtered = upazilas.filter((u) => u.district_id === selected.id);
      setFilteredUpazilas(filtered);
    }
  }, [formData.district, districts, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.status !== "active") {
      toast.error("You are blocked. Cannot create request.");
      return;
    }

    try {
      const requestData = {
        ...formData,
        status: "pending", // Set manually
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/donation-requests", requestData);
      if (res.status === 201 || res.status === 200) {
        toast.success("Donation request created!");
        navigate("/dashboard"); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create donation request");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#D7263D]">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="requesterName"
          value={formData.requesterName}
          disabled
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          type="email"
          name="requesterEmail"
          value={formData.requesterEmail}
          disabled
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          value={formData.recipientName}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
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
          value={formData.upazila}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
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

        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="requestMessage"
          placeholder="Why is the blood needed?"
          value={formData.requestMessage}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full gradient-red">
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
