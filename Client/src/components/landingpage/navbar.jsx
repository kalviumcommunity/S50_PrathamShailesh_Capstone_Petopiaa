import React from "react";
import logo from "../../assets/Frame_1__4_-removebg-preview.png"

function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-3 md:p-5 "> 
      <div className="mb-4 md:mb-0">
        <img src={logo} alt="" className="h-20 " />
        {/* <h1 className="logo text-4xl font-bold">  
          <span className="text-pink-600">P</span>ETOPIA
        </h1> */}
      </div>
      <div className="md:space-x-10 space-x-5 text-lg md:flex">
        <a href="#" className="text-gray-800 hover:text-gray-600">
          HOME
        </a>
        <a href="#" className="text-gray-800 hover:text-gray-600">
          ABOUT
        </a>
        <a href="#" className="text-gray-800 hover:text-gray-600">
          CONTACT US
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-10"> 
        <a
          href="#"
          className="signup text-gray-800 hover:text-gray-600 border-2 border-gray-800 px-4 py-2 md:px-5 rounded-full"
        >
          Sign In
        </a>
        <a
          href="#"
          className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-2 rounded md:px-7"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
