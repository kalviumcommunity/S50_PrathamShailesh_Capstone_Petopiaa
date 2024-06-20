import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const contact=()=>{
    navigate("/Contact")

  }
  return (
    <div className="bg-pink-100 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 m-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">About Our Platform</h1>
        <div className="mb-6">
          <img src="https://brunswick.ces.ncsu.edu/wp-content/uploads/2022/05/pets-g6fa575878_1920.jpg" alt="Pet Adoption" className="w-full h-auto rounded-lg shadow-md mb-4"/>
          <p className="text-gray-700 text-lg">
            Many pet owners struggle to find suitable homes for their pets when they are no longer able to care for them due to various reasons such as moving to a new location, financial difficulties, or changes in lifestyle. This often leads to pets being abandoned or surrendered to overcrowded animal shelters, where they may face uncertain futures or even euthanasia due to limited resources and space. Many pets are given away to people who don't want to take care of them, and these pets end up treated badly.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Our Solution</h2>
          <p className="text-gray-700 text-lg">
            To address this issue, this platform provides a user-friendly interface where pet owners can create detailed profiles for their pets, including photos, descriptions, and relevant information such as age, breed, temperament, and health status. The user who wants to adopt a pet can easily communicate with a person who is giving it away and make a deal to adopt it.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>Create a User-Friendly Interface</li>
            <li>Implement Pet Listing Features</li>
            <li>Enable Search and Filter Options</li>
            <li>Ensure Seller Verification</li>
            <li>Real Time Chat with other users</li>
          </ul>
        </div>
        <div className="text-center">
          <button className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          onClick={contact}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
