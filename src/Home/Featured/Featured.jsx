import React from "react";
import {
  FaHeartbeat,
  FaSearchLocation,
  FaUserFriends,
  FaShieldAlt,
} from "react-icons/fa";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const features = [
  {
    icon: <FaHeartbeat className="text-red-600 text-4xl" />,
    title: "Quick Blood Requests",
    description:
      "Raise emergency blood requests within seconds. Get support from verified donors nearby.",
  },
  {
    icon: <FaSearchLocation className="text-red-600 text-4xl" />,
    title: "Find Nearby Donors",
    description:
      "Search and connect with available donors based on your district and blood group.",
  },
  {
    icon: <FaUserFriends className="text-red-600 text-4xl" />,
    title: "Trusted Community",
    description:
      "Join a growing network of life-saving donors with real-time activity and tracking.",
  },
  {
    icon: <FaShieldAlt className="text-red-600 text-4xl" />,
    title: "Secure & Verified",
    description:
      "All users and donations are verified to ensure safety and authenticity.",
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-12  px-4 md:px-8 lg:px-20">
      <SectionTitle
        title={"Why Choose Bloodline?"}
        subTitle={
          " We are more than just a platform — we are a life-saving community."
        }
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            data-aos="fade-up"
            data-aos-delay={index * 100} 
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
