import React from 'react'

function FindPet() {
  return (
    <div>
    <div className="flex justify-center mt-48">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-pink-400 rounded-full flex justify-center items-center mr-5"></div>
        <div className="text-2xl text-pink-400 h-1 w-64 bg-pink-400"></div>
        <div className="w-10 h-10 bg-pink-400 rounded-full flex justify-center items-center mx-5"></div>
        <div className="text-2xl text-pink-400 h-1 w-64 bg-pink-400"></div>
        <div className="w-10 h-10 bg-pink-400 rounded-full flex justify-center items-center ml-5"></div>
      </div>
    </div>
    <div className="flex justify-center mt-15 p-10 ">
      <div className="new">
        <div className="mr-10">
          <h2 className="text-2xl text-pink-600 font-semibold">
            Find your Pet
          </h2>
          <p className="text-lg text-pink-500 p-5">
            Select a Pet from our <br /> sellers
          </p>
        </div>
        <div className="mx-auto">
          <h2 className="text-2xl text-pink-600 font-semibold">
            Know your pet
          </h2>
          <p className="text-lg text-pink-500 p-5">
            Text the current owner <br /> and know about your Pet
          </p>
        </div>
        <div className="ml-10">
          <h2 className="text-2xl text-pink-600 font-semibold">
            Take your Pet home
          </h2>
          <p className="text-lg text-pink-500 p-5">
            Meet the owner and take <br /> your Pet home
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FindPet