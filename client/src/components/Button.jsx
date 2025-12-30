import React from "react";

const Button = ({ value }) => {
  return (
    <button
      type="submit"
      className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors cursor-pointer "
    >
      {value}
    </button>
  );
};

export default Button;
