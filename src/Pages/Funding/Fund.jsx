import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import GiveFundModal from "../../Shared/GiveFundModal/GiveFundModal";

const Fund = () => {
  const axiosSecure = useAxiosSecure();
  const [funds, setFunds] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axiosSecure
      .get(`/funds?page=${page}&limit=10`)
      .then((res) => {
        setFunds(res.data.funds);
        setTotal(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, page]);

  const totalPages = Math.ceil(total / 10);

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
                key={index}
                className="hover:bg-[#f9f9f9] border-b transition-all duration-200"
              >
                <td className="px-6 py-4 font-medium">
                  {(page - 1) * 10 + index + 1}
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

      {showModal && <GiveFundModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Fund;
