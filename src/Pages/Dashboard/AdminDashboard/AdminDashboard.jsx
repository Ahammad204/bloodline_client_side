import React from "react";
import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //  Query for users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //  Query for donation requests
  const { data: donationRequests = [] } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Query for total funding
  const { data: totalFundingData = { totalAmount: 0 } } = useQuery({
    queryKey: ["funds", "total"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds/total");
      return res.data;
    },
  });

  //  Query for chart data
  const { data: donationChart = [] } = useQuery({
    queryKey: ["analytics", "donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/donation-requests");
      return [
        { name: "Today", value: res.data.daily },
        { name: "Last 7 Days", value: res.data.weekly },
        { name: "This Month", value: res.data.monthly },
      ];
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#D7263D]">
        Welcome {user?.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center text-4xl text-[#D7263D] mb-2">
            <FaUsers />
          </div>
          <h3 className="text-2xl font-bold">
            <CountUp end={users.length} duration={1.5} />
          </h3>
          <p className="text-gray-600 mt-1">Total Donors</p>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center text-4xl text-[#D7263D] mb-2">
            <FaHandHoldingUsd />
          </div>
          <h3 className="text-2xl font-bold text-green-600">
            $
            <CountUp
              end={totalFundingData.totalAmount}
              duration={2}
              separator=","
            />
          </h3>
          <p className="text-gray-600 mt-1">Total Funding</p>
        </div>

        {/* Total Requests */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center text-4xl text-[#D7263D] mb-2">
            <FaTint />
          </div>
          <h3 className="text-2xl font-bold">
            <CountUp end={donationRequests.length} duration={1.5} />
          </h3>
          <p className="text-gray-600 mt-1">Blood Donation Requests</p>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold text-[#D7263D] mb-4">
          Donation Request Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationChart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#D7263D" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
