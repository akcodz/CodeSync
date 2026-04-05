import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import AboutUs from '../components/AboutUs'

const Home = () => {

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