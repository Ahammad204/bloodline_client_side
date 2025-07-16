import React, { useState } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import GiveFundModal from "../../Shared/GiveFundModal/GiveFundModal";
import { useQuery } from "@tanstack/react-query";

const Fund = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["funds", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/funds?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60 * 1000, // 1 minute
  });

  const funds = data?.funds || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#D7263D]">Funding Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary gradient-red"
        >
          Give Fund
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500 py-10">
          Something went wrong: {error.message}
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-[#D7263D] to-[#F75C4E] text-white">
                  <th className="px-6 py-3 text-left font-semibold">#</th>
                  <th className="px-6 py-3 text-left font-semibold">Donor Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Amount ($)</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund, index) => (
                  <tr
                    key={fund._id || index}
                    className="hover:bg-[#f9f9f9] border-b transition-all duration-200"
                  >
                    <td className="px-6 py-4 font-medium">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4">{fund.name}</td>
                    <td className="px-6 py-4">${fund.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {new Date(fund.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm gradient-red ${
                    page === i + 1 ? "btn-primary" : ""
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && <GiveFundModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Fund;
