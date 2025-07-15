import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdEmail, MdPhone } from "react-icons/md";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("access_key", import.meta.env.VITE_WEB3_ACCESS_KEY);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed.");
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-20 bg-base-100" id="contact">
            <SectionTitle title={"Contact Us"} subTitle={"We’d love to hear from you!"}/>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Details */}
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-lg text-gray-700">
            <MdPhone className="text-2xl text-[#D7263D]" />
            Hotline: <a href="tel:+8801234567890">+8801234567890</a>
          </p>
          <p className="flex items-center gap-2 text-lg text-gray-700">
            <MdEmail className="text-2xl text-[#D7263D]" />
            Email: <a href="mailto:bloodline.help@gmail.com">bloodline.help@gmail.com</a>
          </p>
          <p className="text-gray-600">
            Reach out for any questions, blood emergencies, or collaboration opportunities.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 bg-white shadow rounded-xl"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
          <button type="submit" className="btn btn-primary w-full gradient-red">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
