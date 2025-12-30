import React from 'react'

const InputBox = ({data,setData,title,name,type,placeholder}) => {
    const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value});
    console.log(data);
  }
  return (
    <div>
        <label className='block text-sm font-medium mb-2'>{title}</label>
        <input
            name={name} 
            type={type} 
            placeholder={placeholder}
            className='h-10 w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            value = {data[name]}
            onChange={(e)=>{handleChange(e)}}
            required  
        />
    </div>
  )
}

export default InputBox