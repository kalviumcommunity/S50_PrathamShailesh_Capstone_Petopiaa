import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 py-16">
  <div className="container mx-auto px-4">
    <div className="flex justify-center items-center">

      <h1 className="logo text-4xl font-bold">
              <span className="text-pink-600">P</span>ETOPIA
            </h1>
    </div>
    <p className="text-gray-400 text-center mt-4">Your go-to destination for all things pet-related</p>
    <div className="mt-8 text-center">
      <p className="text-gray-400">Contact Us:</p>
      <p className="text-gray-400">Email: info@petopia.com</p>
      <p className="text-gray-400">Phone: 123-456-7890</p>
    </div>
    <div className="mt-8 text-center">
      <p className="text-gray-400">"The love of a pet makes a house feel like home."</p>
    </div>
    <div className="mt-8 flex justify-center items-center">
      <p className="text-gray-400 mr-4">Follow us on social media:</p>
      <a href="#" className="text-gray-400 hover:text-gray-300 mr-4"></a>
      <a href="#" className="text-gray-400 hover:text-gray-300 mr-4"></a>
      <a href="#" className="text-gray-400 hover:text-gray-300"></a>
    </div>
  </div>
</footer>
  )
}

export default Footer