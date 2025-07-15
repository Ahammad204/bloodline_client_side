import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";

const BlogsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => {
        if (res.data.status === "published") {
          setBlog(res.data);
        } else {
          toast.error("This blog is not published");
        }
      })
      .catch(() => toast.error("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [axiosSecure, id]);

  if (loading) return <Loading />;

  if (!blog) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        Blog not found or unpublished.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative mb-8 rounded-lg overflow-hidden shadow-md">
  <img
    src={blog.thumbnail}
    alt={blog.title}
    className="w-full h-[280px] sm:h-[360px] object-cover"
  />
  <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-end px-6 py-4">
    <h1 className="text-white text-2xl sm:text-3xl font-bold">
      {blog.title}
    </h1>
  </div>
</div>


      {/* Blog Meta */}
      <div className="flex justify-between items-center mb-6 text-sm text-gray-600 border-b pb-4">
        <span>
          Published on: {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="bg-[#D7263D] text-white px-2 py-1 rounded text-xs uppercase tracking-wider">
          {blog.status}
        </span>
      </div>

      {/* Blog Content */}
      <div
        className="text-gray-800 leading-7 space-y-4"
        style={{ lineHeight: "1.75rem", fontSize: "1rem" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogsDetails;
