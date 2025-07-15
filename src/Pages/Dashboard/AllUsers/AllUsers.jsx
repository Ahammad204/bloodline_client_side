/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import {
  FaEllipsisV,
  FaUserShield,
  FaUserEdit,
  FaUserTimes,
  FaUser,
} from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@material-tailwind/react";
import useAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const filteredUsers = users.filter((u) =>
    statusFilter === "all" ? true : u.status === statusFilter
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredUsers.length / limit);

  const updateUser = async (id, data) => {
    try {
      await axiosSecure.patch(`/users/${id}`, data);
      toast.success("User updated");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, ...data } : u))
      );
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#D7263D] mb-6">All Users</h2>

      {/* Filter */}
      <div className="flex gap-3 mb-6">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 rounded-md font-medium border transition ${
              statusFilter === status
                ? "bg-[#D7263D] text-white"
                : "border-[#D7263D] text-[#D7263D]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full table-zebra">
          <thead className="bg-[#D7263D] text-white">
            <tr>
              <th>Avatar</th>
              <th>Name & Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition-all">
                <td className="py-3">
                  <Avatar
                    src={u.avatar || "https://i.ibb.co/4fQ1sKF/default-avatar.png"}
                    alt={u.name}
                    size="md"
                    variant="rounded"
                    className="border border-gray-300 shadow-md h-14 w-14 object-cover"
                  />
                </td>
                <td>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </td>
                <td className="capitalize font-semibold">{u.role}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="text-center">
                  <Menu placement="left-start">
                    <MenuHandler>
                      <Button
                        size="sm"
                        variant="text"
                        className="text-gray-600 hover:bg-gray-200 rounded-full p-2"
                      >
                        <FaEllipsisV />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1 text-sm shadow-xl">
                      {u.status === "active" ? (
                        <MenuItem
                          onClick={() => updateUser(u._id, { status: "blocked" })}
                          className="flex items-center gap-2 hover:bg-red-100"
                        >
                          <FaUserTimes className="text-red-500" />
                          Block
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() => updateUser(u._id, { status: "active" })}
                          className="flex items-center gap-2 hover:bg-green-100"
                        >
                          <FaUserEdit className="text-green-600" />
                          Unblock
                        </MenuItem>
                      )}

                      {/* Change Roles */}
                      {u.role !== "donor" && (
                        <MenuItem
                          onClick={() => updateUser(u._id, { role: "donor" })}
                          className="flex items-center gap-2 hover:bg-blue-100"
                        >
                          <FaUser className="text-blue-500" />
                          Make User
                        </MenuItem>
                      )}

                      {u.role !== "volunteer" && (
                        <MenuItem
                          onClick={() => updateUser(u._id, { role: "volunteer" })}
                          className="flex items-center gap-2 hover:bg-blue-100"
                        >
                          <FaUserShield className="text-blue-600" />
                          Make Volunteer
                        </MenuItem>
                      )}

                      {u.role !== "admin" && (
                        <MenuItem
                          onClick={() => updateUser(u._id, { role: "admin" })}
                          className="flex items-center gap-2 hover:bg-purple-100"
                        >
                          <FaUserShield className="text-purple-600" />
                          Make Admin
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              i + 1 === page
                ? "bg-[#D7263D] text-white"
                : "border border-[#D7263D] text-[#D7263D]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
