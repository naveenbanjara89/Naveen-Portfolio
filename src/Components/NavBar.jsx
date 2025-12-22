import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import { FiMenu } from "react-icons/fi";
import OverlayMenu from './OverlayMenu'

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  return (
    <>
`
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full" } `}>
      <div className='flex items-center space-x-1 '>
        <img  src={Logo} alt="logo" className='w-8 h-8 cursor-pointer ' />
        <div  className='text-2xl font-bold text-white cursor-pointer hidden sm:block '>
          Naveen  
        </div>
      </div>
      <div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 '>
      <button onClick={()=>setMenuOpen(true)} className=' text-white text-3xl focus:outline- cursor-pointer ' aria-label='open menu'  ><FiMenu /></button>
      </div>
      <div className='hidden lg:block  '>
        <a href='#contact' className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300 '>
          Reach Out
        </a>
      </div>
    </nav>

    <OverlayMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)} />

    </>
  )
}

export default NavBar