import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">😕</div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have wandered off into the digital void. 
          Let's get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-4 text-4xl">
          <span className="animate-bounce delay-100">🛍️</span>
          <span className="animate-bounce delay-200">👜</span>
          <span className="animate-bounce delay-300">🎒</span>
        </div>
      </div>
    </div>
  )
}

export default Error