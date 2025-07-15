
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import axiosPublic from "../../../utils/axiosPublic";

const DashboardProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    // Set initial form data
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        district: user.district || "",
        upazila: user.upazila || "",
        bloodGroup: user.bloodGroup || "",
      });
    }
  }, [user]);

  useEffect(() => {
    axiosPublic.get("/geocode/districts").then((res) => setDistricts(res.data));
    axiosPublic.get("/geocode/upazilas").then((res) => setUpazilas(res.data));
  }, []);

  useEffect(() => {
    // Filter upazilas when district changes
    const selectedDistrict = districts.find(
      (d) => d.name === formData.district
    );
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        (u) => u.district_id === selectedDistrict.id
      );
      setFilteredUpazilas(filtered);
    }
  }, [formData.district, districts, upazilas]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const { data } = await axiosSecure.patch(`/users/${user._id}`, formData);
      toast.success("Profile updated successfully!");
      console.log(data)
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Profile</h2>
        {!isEditing ? (
          <button onClick={handleEditToggle} className="btn btn-sm btn-primary gradient-red">
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-sm btn-success">
            Save
          </button>
        )}
      </div>

      <form className="space-y-4">
        <div className="flex justify-center mb-4">
          <img
            src={formData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-red-400"
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="input input-bordered w-full bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="label">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!isEditing}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            disabled={!isEditing}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
