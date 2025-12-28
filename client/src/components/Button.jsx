import React from "react";
import axios from "axios";

import {useNavigate} from 'react-router';



const Button = ({ data, setData, value }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value == "Login") {
      axios
        .post("http://localhost:3000/users/login", data)
        .then((resp) => {
          if (resp.data.status)
            {
              console.log(resp.data.message);
              navigate('/Dashboard');
            } 
        })
        .catch((err) => {
          console.log(err.response?.data?.message || err);
        });
    } 
    else if (value == "Sign Up") {
      axios
        .post("http://localhost:3000/users/register", data)
        .then((resp) => {
          if (resp.data.status) console.log(resp.data.message);
        })
        .catch((err) => {
          console.log(err.response?.data?.message || "Sign Up Failed..");
        });
    }
  };
  return (
    <button
      className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors cursor-pointer "
      onClick={(e) => {
        handleSubmit(e);
      }}
    >
      {value}
    </button>
  );
};

export default Button;
