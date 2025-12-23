import React, { useEffect, useState } from 'react'
import Logo from "../assets/logo.png"
import { FiMenu } from "react-icons/fi";
import OverlayMenu from './OverlayMenu'
import { useRef } from 'react';

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [forceVisible, setForceVisible] = useState(false)

  const lastScrollY=useRef(0);
  const timerId=useRef(null)

  useEffect(() => {
    const homeSection=document.querySelector("#home")
    const observer =new IntersectionObserver(
      ([entry])=>{
      if(entry.isIntersecting){
        setForceVisible(true)
        setVisible(true)
      }else{
        setForceVisible(false)
      }
      },{threshold:0.1 }
    )
    if(homeSection) observer.observe(homeSection);
    return ()=>{
      if(homeSection) observer.unobserve(homeSection)
    }
    
  }, [])
  

  useEffect(() => {
    const handeScroll=()=>{
      if(forceVisible){
        setForceVisible(true)
        return
      }
    
    const currentscrollY= window.scrollY
    if(currentscrollY>lastScrollY.current){
      setVisible(false)
    }  else{
      setVisible(false)
    if(timerId.current) clearTimeout(timerId.current);
    
    timerId.current=setTimeout(()=>{
      setVisible(false)
    },3000)
    }
    lastScrollY.current=currentscrollY;

    }
    window.addEventListener("scroll",handeScroll,{passive:true})

    return()=>{
      window.removeEventListener("scroll",handeScroll)
      if(timerId.current) clearTimeout(timerId.current)
    }

  }, [forceVisible])
  



  return (
    <>
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