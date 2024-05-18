import React from "react";
import Navbar from "./landingpage/navbar";
import Footer from "./landingpage/Footer";
import PetCategories from "./landingpage/PetCategories";
import FindPet from "./landingpage/FindPet";
import Hero from "./landingpage/Hero";
import Explore from "./landingpage/Explore";

function LandingPage() {
  return (
    <div className="bg-pink-200">
      <div className="p-5 md:px-20">
        <Navbar />
        <Hero />
      </div>
      <Explore />
      {/* <FindPet /> */}
      <PetCategories />
      <Footer />
    </div>
  );
}

export default LandingPage;

