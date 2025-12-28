import React from 'react'
import Password from './password'

const EmailAndPassword = ({data,setData,showPassword,setShowPassword}) => {
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value});
    console.log(data);
  }
  return (
    <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-2'>Email address</label>
          <input 
              name="email"
              type='email' 
              placeholder='Enter your email address'
              className='w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              required
              value = {data.email}
              onChange={(e)=>{handleChange(e)}}
          />
      </div>
      <div>
          <label className='block text-sm font-medium mb-2'>Password</label>
          <div className='relative'>
              <input 
                  name="password"    
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='Create a password'
                  className='w-full px-4 py-2 pr-10 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  required
                  minLength={8}
                  value = {data.Password}
                  onChange={(e)=>{handleChange(e)}}
              />
              <Password showPassword={showPassword} setShowPassword={setShowPassword}></Password>

          </div>
      </div>
    </div>
  )
}

export default EmailAndPassword