import React from "react";

const Button = ({ value, className ="", onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white py-2 rounded-lg font-medium transition-colors cursor-pointer ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
