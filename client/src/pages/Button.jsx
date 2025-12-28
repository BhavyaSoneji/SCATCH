import React from "react";
import axios from "axios"

const Button = ({data, value }) => {
    const handleSubmit = async  (e)=>{
        e.preventDefault();
        console.log(data);
        
        axios.post('http://localhost:3000/users/login',data)
        .then((resp)=>{
            console.log(resp);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors cursor-pointer "
    onClick={(e)=>{handleSubmit(e)}}
    >
    {value}
    </button>
  );
};

export default Button;
