import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaShareSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const Blogs = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all published blogs
  useEffect(() => {
    axiosSecure
      .get("/blogs")
      .then((res) => {
        const published = res.data.filter((b) => b.status === "published");
        setBlogs(published);
        setFilteredBlogs(published);
      })
      .catch((err) => {
        toast.error("Failed to load blogs");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // Search filter
  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = blogs.filter((b) =>
      b.title.toLowerCase().includes(keyword)
    );
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  if (loading) return <Loading />;
  // Function to copy URL to clipboard
  const copyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#D7263D] mb-6">
        Our Health Blogs 📝
      </h2>

      {/* Search Bar */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search blog by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blog found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const blogUrl = `${window.location.origin}/blogs/${blog._id}`;
            return (
              <div
                key={blog._id}
                className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#D7263D] mb-2">
                    {blog.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    style={{ lineHeight: "1.75rem", fontSize: "1rem" }}
                  >
                    {stripHtml(blog.content).slice(0, 100)}...
                  </p>

                  <Link to={`/blogs/${blog._id}`}>
                    <button className="btn btn-sm btn-primary gradient-red w-full">
                      Read More
                    </button>
                  </Link>
                  <div className="flex justify-center gap-6 mt-3 text-3xl">
                    <FaShareSquare
                      className="cursor-pointer text-gray-700 hover:text-gray-900"
                      title="Copy link to clipboard"
                      onClick={() => copyToClipboard(blogUrl)}
                    />

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        blogUrl
                      )}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on Twitter"
                      className="text-sky-500 hover:text-sky-700"
                    >
                      <FaTwitterSquare />
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        blog.title + " " + blogUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share on WhatsApp"
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaWhatsappSquare />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blogs;
