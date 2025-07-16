import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../utils/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [newThumbnailFile, setNewThumbnailFile] = useState(null);

  // Fetch blog data
  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const { data } = await axiosSecure.get(`/blogs/${id}`);
  //       setTitle(data.title);
  //       setThumbnail(data.thumbnail);
  //       setContent(data.content);
  //       setLoading(false);
  //     } catch (err) {
  //       toast.error("Failed to load blog");
  //       console.error(err);
  //     }
  //   };
  //   fetchBlog();
  // }, [axiosSecure, id]);

  const { data, isLoading } = useQuery({
  queryKey: ["blogs", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/blogs/${id}`);
    return res.data; 
  },
  enabled: !!id, 
});

useEffect(() => {
  if (data) {
    setTitle(data.title);
        setThumbnail(data.thumbnail);
        setContent(data.content);
  }
}, [data]);

  // Handle image upload if changed
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
    try {
      let imageUrl = thumbnail;

      if (newThumbnailFile) {
        const uploaded = await handleImageUpload(newThumbnailFile);
        if (!uploaded) return;
        imageUrl = uploaded;
      }

      const updatedBlog = {
        title,
        thumbnail: imageUrl,
        content,
      };

      await axiosSecure.patch(`/blogs/${id}`, updatedBlog);
      toast.success("Blog updated successfully");
      navigate("/dashboard/content-management");
    } catch (err) {
      toast.error("Failed to update blog");
      console.error(err);
    }
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-[#D7263D] mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow-lg">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-semibold">Current Thumbnail</label>
          <img src={thumbnail} alt="Thumbnail" className="w-40 rounded border mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewThumbnailFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary gradient-red mt-4">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditContent;
