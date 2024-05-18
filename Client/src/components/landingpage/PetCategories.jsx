import React from 'react'
import lovebirds from "../../assets/lovebirds.png"
import cat from "../../assets/cat.png"
import dog from "../../assets/dog.png"
import fish from "../../assets/fish.png"

function PetCategories() {
  return (
    <div className="mt-48 text-center pb-32">
    <h1 className="text-3xl font-bold pb-10 ">Pet Categories</h1>{" "}
    <div className="grid grid-cols-4 gap-4 mt-4 ">
      <div className="flex flex-col items-center">
        <img src={lovebirds} alt="" />
        <p className="text-2xl font-semibold">Birds</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={cat} alt="" />
        <p className="text-2xl font-semibold">Cats</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={dog} alt="" />
        <p className="text-2xl font-semibold">Dogs</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={fish} alt="" />
        <p className="text-2xl font-semibold">Fishes</p>
      </div>
    </div>
  </div>
  )
}

export default PetCategories