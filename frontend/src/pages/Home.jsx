import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import AboutUs from '../components/AboutUs'

const Home = () => {
  const SIX_HOURS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function checkLocalStorageExpiry() {
  const lastCleared = localStorage.getItem("lastCleared");
  const now = Date.now();

  if (!lastCleared || now - lastCleared > SIX_HOURS) {
    localStorage.clear();
    localStorage.setItem("lastCleared", now);
  }
}

// Run check on page load
checkLocalStorageExpiry();

  return (
    <div className='min-h-screen w-full relative bg-[#121212]'>
        <Navbar/>
        <Hero/>
        <AboutUs/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Home