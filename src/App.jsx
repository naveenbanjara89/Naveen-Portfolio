import React from 'react'
import NavBar from './Components/NavBar'
// import ParticlesBackground from './Components/ParticlesBackground'
import CustomCursor from './Components/CustomCursor'
import Home from './Section/Home'
import About from './Section/About'
import Contact from './Section/Contact'
import Exprience from './Section/Exprience'
import Footer  from './Section/Footer'
import Projects from './Section/Projects'
import Testimonials from './Section/Testimonials'
import Skills from './Section/Skills'

const App = () => {
  return (
    <div className='relative gradient text-white '>
      <CustomCursor/>
      {/* <ParticlesBackground/> */}
      <NavBar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Exprience/>
      <Testimonials/>
      <Contact/>
      <Footer/> 

    </div>
  )
}

export default App