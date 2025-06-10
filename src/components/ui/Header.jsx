import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="bg-card shadow-sm py-0 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://www.shutterstock.com/image-vector/blood-donation-logo-design-vector-600nw-2233019493.jpg"
          alt="Blood Drop Logo"
          className="h-20 w-40 object-contain"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600">
        LifeStream: Connecting Donors, Saving Lives
      </h1>
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold transition duration-300"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </header>
  );
}

export default Header;
