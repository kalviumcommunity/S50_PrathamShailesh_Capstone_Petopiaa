import React from "react";
import { FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <h1 className="logo text-4xl font-bold">
            <span className="text-pink-600">P</span>ETOPIA
          </h1>
        </div>
        <p className="text-gray-400 text-center mt-4">
          Your go-to destination for all things pet-related
        </p>
        <div className="mt-8 text-center">
          <p className="text-gray-400">Contact Us:</p>
          <p className="text-gray-400">Email: prathamshailesh777@gmail.com</p>
          {/* <p className="text-gray-400">Phone: 123-456-7890</p> */}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            "The love of a pet makes a house feel like home."
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <p className="text-gray-400 mb-2">Follow me on social media:</p>

          <div className="flex">
            <a
              href="https://www.instagram.com/prathamshailesh/"
              className="text-gray-400 hover:text-gray-300 mr-4"
            >
              <FaInstagramSquare style={{ fontSize: "34px" }} />
            </a>

            <a
              href="https://x.com/"
              className="text-gray-400 hover:text-gray-300 mr-4"
            >
              <FaXTwitter style={{ fontSize: "34px" }} />
            </a>

            <a
              href="https://www.linkedin.com/in/pratham-shailesh-dsouza-b7246b27b/"
              className="text-gray-400 hover:text-gray-300"
            >
              <FaLinkedin style={{ fontSize: "34px" }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
