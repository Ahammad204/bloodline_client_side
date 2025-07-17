import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../Hooks/UseAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
    const queryClient = useQueryClient();

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myDonationRequests", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const { data } = await axiosSecure.get("/donation-requests");
      console.log(data);
      // Filter and sort here as before
      return data
        .filter((req) => req.requesterEmail === user.email)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
    },
  });

const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      toast.success(`Marked as ${status}`);
      queryClient.invalidateQueries(["myDonationRequests", user?.email]);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D7263D",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/donation-requests/${id}`);
          toast.success("Request deleted successfully");
          queryClient.invalidateQueries(["myDonationRequests", user?.email]);
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
        } catch (error) {
          toast.error("Failed to delete request");
          Swal.fire("Error!", "Something went wrong!", "error");
          console.error(error);
        }
      }
    });
  };

    if (isLoading) return <Loading/>;
  if (isError) return toast.error(`Error ${error.message}`);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#D7263D] mb-4">
        Welcome {user.name}
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
                        <button className="btn btn-xs btn-primary gradient-red">
                          View
                        </button>
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
