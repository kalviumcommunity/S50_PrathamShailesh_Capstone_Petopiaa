import LandingPage from './components/LandingPage';
import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Form/SignUp';
import Login from './components/Form/Login';
import MainPage from './components/Mainpage/MainPage';
import Rehome from './components/RehomeApet/Rehome';
import Profile from './components/Profile/Profile';
import ChatBox from './components/ChatBox/ChatBox';
import AboutPage from "./components/AboutPage/about"
import Contact from './components/ContactUs/contact';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Rehome" element={<Rehome />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Contact" element={<Contact />} />
        {/* <LandingPage/> */}
      </Routes>
    </>
  );
}

export default App;
