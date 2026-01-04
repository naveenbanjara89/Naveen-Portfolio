import { image, link, title } from 'framer-motion/client';
import React, { useEffect, useMemo, useRef, useState } from 'react'


const useIsMobile=(query="(max-width:640px)")=>{
  const [isMobile, setIsMobile] = useState(
    typeof window !=="undefined" && window.matchMedia(query).matches
  )

  useEffect(() => {
    if(typeof window ==="undefined") return;
    const mql=window.matchMedia(query)
    const handler=(e)=>setIsMobile(e.matches)

    mql.addEventListener("change",handler)
    setIsMobile(mql.matches)
    return()=>mql.removeEventListener("change",handler)

  }, [query])
  return isMobile;

}


const Projects = () => {
  const isMobile=useIsMobile()
  const sceneRef=useRef(null)

  const projects=useMemo(()=>[
    {
      title:"",
      link:"https://vexiva.netlify.app",
      bgColor:"#0d4d3d",
      image:isMobile ? photo1 : img1
    },
    {
      title:"",
      link:"https://reals-estate.netlify.app/",
      bgColor:"#3884d3",
      image:isMobile ? photo2 : img2
    },
    {
      title:"",
      link:"https://nakes-game.netlify.app/",
      bgColor:"#dc9317",
      image:isMobile ? photo3 : img3
    },
  ],
  [isMobile]
)

  return (
    <section id='projects' className='relative text-white  '></section>
  )
}

export default Projects