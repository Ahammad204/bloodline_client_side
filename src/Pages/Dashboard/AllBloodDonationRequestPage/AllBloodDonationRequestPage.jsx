import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllBloodDonationRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axiosSecure.get("/donation-requests");
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRequests(sorted);
      } catch (err) {
        toast.error("Failed to fetch all requests");
        console.error(err);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

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
          toast.success("Request deleted");
          setRequests((prev) => prev.filter((req) => req._id !== id));
          Swal.fire("Deleted!", "The request has been deleted.", "success");
        } catch (err) {
          toast.error("Failed to delete request");
          Swal.fire("Error!", "Something went wrong!", "error");
          console.log(err);
        }
      }
    });
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.status === filter);

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#D7263D] mb-4">
        All Blood Donation Requests 🩸
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setCurrentPage(1);
            }}
            className={`btn btn-sm ${
              filter === status ? "btn-accent gradient-red" : "btn-outline"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
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
            {currentRequests.map((req) => (
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
                      navigate(`/dashboard/edit-donation-request/${req._id}`)
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-active" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequestPage;
