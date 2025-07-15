import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import toast from "react-hot-toast";
import { FaImage, FaFileSignature } from "react-icons/fa";

const AddBlogPage = () => {
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const apiKey = import.meta.env.VITE_IMGBB_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.data.url;
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) {
      toast.error("All fields are required");
      return;
    }

    const imageUrl = await handleImageUpload(thumbnail);
    if (!imageUrl) return;

    const blogData = {
      title,
      thumbnail: imageUrl,
      content,
      status: "draft",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/blogs", blogData);
      toast.success("Blog created as draft");
      setTitle("");
      setThumbnail(null);
      setPreviewURL("");
      setContent("");
    } catch (err) {
      toast.error("Failed to create blog");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-[#D7263D] mb-8 tracking-tight">
        ✍️ Add New Blog
      </h2>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/70 p-8 rounded-xl shadow-2xl border border-gray-200 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1">
            <FaFileSignature />
            Blog Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to Donate Blood the Smart Way"
            className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-[#D7263D] transition"
            required
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1">
            <FaImage />
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
              setPreviewURL(URL.createObjectURL(e.target.files[0]));
            }}
            className="file-input file-input-bordered w-full"
            required
          />
          {previewURL && (
            <img
              src={previewURL}
              alt="Preview"
              className="mt-3 w-full max-w-sm rounded-md shadow-md border"
            />
          )}
        </div>

        {/* Blog Content */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Content
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#D7263D] hover:bg-[#b71b2c] transition px-6 py-2
             rounded-md text-white font-semibold shadow-lg cursor-pointer"
          >
            🚀 Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
