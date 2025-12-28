import React from 'react'

import {Eye, EyeOff} from "lucide-react"

const Password = ({showPassword, setShowPassword}) => {
  return (
        <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-black cursor-pointer'
            
        >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
  )
}

export default Password;