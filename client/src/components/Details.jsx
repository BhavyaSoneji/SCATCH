import React from "react";

const Details = ({ label, data, className }) => {
  return (
    <div className="flex gap-2">
      <label htmlFor="email" className={`text-zinc-700 ${className}`}>
        {label}:
      </label>
      <p className="text-black font-semibold">{data || "N/A"}</p>
    </div>
  );
};

export default Details;
