import React from "react";

const SectionTitle = ({title,subTitle}) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#D7263D]">
        {title}
      </h2>
      <p className="text-gray-600 mt-2">
       {subTitle}
      </p>
    </div>
  );
};

export default SectionTitle;
