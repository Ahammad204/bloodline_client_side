import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axiosSecure.get("/donation-requests");
        const myRequests = data
          .filter((req) => req.requesterEmail === user.email)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setRequests(myRequests);
      } catch (err) {
        toast.error("Failed to fetch donation requests");
        console.log(err);
    
      }
    };
    if (user) fetchRequests();
  }, [axiosSecure, user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      toast.success(`Marked as ${status}`);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      toast.success("Request deleted");
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch {
      toast.error("Failed to delete request");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#D7263D] mb-4">
        Welcome, {user?.name}
      </h2>

      {requests.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">
            Recent Donation Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.district}, {req.upazila}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === "inprogress" && req.donor ? (
                        <>
                          <p>{req.donor.name}</p>
                          <p className="text-sm text-gray-500">
                            {req.donor.email}
                          </p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="space-x-1">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(req._id, "done")}
                            className="btn btn-xs btn-success gradient-red"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, "canceled")
                            }
                            className="btn btn-xs btn-error gradient-red"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-donation-request/${req._id}`
                          )
                        }
                        className="btn btn-xs btn-warning gradient-red"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-outline btn-error gradient-red"
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/donation-request/${req._id}`}>
                        <button className="btn btn-xs btn-primary gradient-red">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <Link to="/dashboard/my-donation-requests">
              <button className="btn btn-outline btn-accent gradient-red">
                View My All Requests
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
