import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/UseAuth";
import {
  FaUser,
  FaMapMarkerAlt,
  FaTint,
  FaHospitalAlt,
  FaRegClock,
} from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const { data, isLoading } = useQuery({
  queryKey: ["donationRequest", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/donation-requests/${id}`);
    return res.data; 
  },
  enabled: !!id, 
});

useEffect(() => {
  if (data) {
   setRequest(data);
  }
}, [data]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inprogress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDonate = async () => {
    try {
      const payload = {
        status: "inprogress",
        donor: {
          name: user.name,
          email: user.email,
        },
      };
      await axiosSecure.patch(`/donation-requests/${id}`, payload);
      toast.success("Donation confirmed!");
      setRequest((prev) => ({
        ...prev,
        status: "inprogress",
        donor: { name: user.name, email: user.email },
      }));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm donation");
    }
  };

  if ( isLoading)
    return (
      <div className="text-center mt-10">
        <Loading />
      </div>
    );
  if (!request)
    return (
      <div className="text-center mt-10 text-red-500">Request not found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D7263D] to-[#ff758c] text-white rounded-lg p-6 shadow-md text-center mb-8">
        <h2 className="text-3xl font-bold mb-1">Donation Request Details</h2>
        <p className="text-sm opacity-90">
          Requested by <strong>{request.requesterName}</strong> on{" "}
          {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-6 text-gray-800">
          {/* Fields */}
          <Detail
            icon={<FaUser />}
            label="Recipient"
            value={request.recipientName}
          />
          <Detail
            icon={<FaTint />}
            label="Blood Group"
            value={request.bloodGroup}
            bold
          />
          <Detail
            icon={<FaMapMarkerAlt />}
            label="Location"
            value={`${request.district}, ${request.upazila}`}
          />
          <Detail
            icon={<FaHospitalAlt />}
            label="Hospital"
            value={`${request.hospitalName}\n${request.address}`}
          />
          <Detail
            icon={<FaRegClock />}
            label="Scheduled Time"
            value={`${request.donationDate} at ${request.donationTime}`}
          />
          <Detail
            icon={"🩸"}
            label="Status"
            value={
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  request.status
                )}`}
              >
                {request.status}
              </span>
            }
          />
        </div>

        <div>
          <p className="font-semibold mb-1 text-[#D7263D]">Request Message:</p>
          <p className="bg-gray-100 p-4 rounded-lg text-sm">
            {request.requestMessage}
          </p>
        </div>

        {request.donor && (
          <div className="border-t pt-5 mt-5">
            <p className="font-semibold text-[#D7263D] mb-2">Donor Info:</p>
            <p>
              <strong>Name:</strong> {request.donor.name}
            </p>
            <p>
              <strong>Email:</strong> {request.donor.email}
            </p>
          </div>
        )}

        {/* Donate Button */}
        {request.status === "pending" && (
          <div className="text-center pt-6">
            <button
              onClick={() => setShowModal(true)}
              className="btn bg-[#D7263D] hover:bg-[#b21d2f] text-white px-6 py-2 rounded-lg shadow"
            >
              Donate Now
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#f5c0c06c] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-[#D7263D] mb-4">
              Confirm Donation
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                value={user.name}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="btn bg-[#D7263D] text-white btn-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable detail item
const Detail = ({ icon, label, value, bold }) => (
  <div className="flex items-start gap-3">
    <div className="text-[#D7263D] text-lg mt-1">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className={bold ? "font-bold text-lg" : ""}>{value}</p>
    </div>
  </div>
);

export default DonationRequestDetails;
