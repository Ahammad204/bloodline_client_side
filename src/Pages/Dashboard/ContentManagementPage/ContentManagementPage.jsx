import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaUpload, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";

const ContentManagementPage = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        toast.error("Failed to fetch blogs");
        console.log(err)
      }
    };
    fetchBlogs();
  }, [axiosSecure]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/blogs/${id}`, { status });
      toast.success(`Blog ${status === "published" ? "published" : "unpublished"}`);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
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
          await axiosSecure.delete(`/blogs/${id}`);
          toast.success("Blog deleted");
          setBlogs((prev) => prev.filter((b) => b._id !== id));
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
        } catch (err) {
          toast.error("Failed to delete blog");
          Swal.fire("Error!", "Something went wrong!", "error");
          console.log(err)
        }
      }
    });
  };
  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((b) => b.status === filter);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#D7263D]">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary gradient-red">Add Blog</button>
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-3">
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="table table-zebra w-full">
          <thead className="bg-[#D7263D] text-white">
            <tr>
              <th>Title</th>
              <th>Thumbnail</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td>
                  <span
                    className={`badge ${
                      blog.status === "published"
                        ? "badge-success gradient-red"
                        : "badge-warning gradient-red"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() =>
                        handleStatusChange(blog._id, "published")
                      }
                      className="btn btn-xs btn-success gradient-red"
                    >
                      <FaUpload /> Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(blog._id, "draft")}
                      className="btn btn-xs btn-warning gradient-red"
                    >
                      <FaUndo /> Unpublish
                    </button>
                  )}

                  <Link to={`/dashboard/content-management/edit-blog/${blog._id}`}>
                    <button className="btn btn-xs btn-info gradient-red">
                      <FaEdit />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-xs btn-error gradient-red"
                  >
                    <FaTrash />
                  </button>
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
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-outline"
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

export default ContentManagementPage;
