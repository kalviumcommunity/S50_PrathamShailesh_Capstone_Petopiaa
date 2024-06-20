import React from 'react';

function Contact() {
  return (
    <div className="bg-pink-100 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 m-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">Contact Us</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="name">Name</label>
            <input type="text" id="name" className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Name" required />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Email" required />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="message">Message</label>
            <textarea id="message" className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Message" rows="6" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
