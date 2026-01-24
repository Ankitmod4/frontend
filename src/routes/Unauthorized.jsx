import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
        <Link to="/homepage" className="text-indigo-600 font-medium m-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-center mt-20">Unauthorized Access</h1>
        <p className="text-center mt-4 text-gray-600">You do not have permission to view this page.</p>

      
    </div>
  )
}

export default Unauthorized
