import { image, link, title } from 'framer-motion/client';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import photo1 from "../assets/photo1.png"
import photo2 from "../assets/photo2.PNG"
import photo3 from "../assets/photo3.png"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';


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
      title:"VEXIVA",
      link:"https://vexiva.netlify.app",
      bgColor:"#0d4d3d",
      image:isMobile ? photo1 : img1
    },
    {
      title:"Real-Estate",
      link:"https://reals-estate.netlify.app/",
      bgColor:"#3884d3",
      image:isMobile ? photo2 : img2
    },
    {
      title:"Snake-Game",
      link:"https://nakes-game.netlify.app/",
      bgColor:"#dc9317",
      image:isMobile ? photo3 : img3
    },
  ],
  [isMobile]
);

const {scrollYProgress}=useScroll({
  target:sceneRef,
  offset:["start start ","end end"]
})
const thresholds=projects.map((_,i)=>(i+1)/projects.length)
const [activeIndex, setActiveIndex] = useState(0)

useMotionValueEvent(scrollYProgress,"change",(v)=>{
  const idx=thresholds.findIndex((t)=> v<=t );
  setActiveIndex(idx === -1 ? thresholds.length-1 :idx )
})

const activeProject=projects[activeIndex];

  return (
    <section id='projects' 
    ref={sceneRef} 
    className='relative text-white  '
    style={{
      height:`${100*projects.length}vh`,
      backgroundColor:activeProject.bgColor,
      transition:"background-color 400ms ease"
    }}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center 
          ${isMobile ? "mt-4":"mt-8" } `}>My Work</h2>
          <div className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4":""
          } `}>
            {projects.map((project,idx)=>(
              <div key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex===idx ? "opacity-100 z-20":"opacity-0 z-0 sm:z-10"
              } `}
              style={{width:"85%",maxWidth:"1200px"}}
              >
                <AnimatePresence mode='wait'>
                  {
                    activeIndex===idx && (
                      <motion.h3  key={project.title}
                      initial={{opacity:0 ,y:-30}}
                      animate={{opacity:1 ,y:0}}
                      exit={{opacity:0 ,y:30}}
                      transition={{duration:0.5 , ease:"easeOut"}}
                      className={`block text-center -mt-6 sm:-mt-8 text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolutesm:top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${
                        isMobile ? "-mt-24 " :""
                      } `}
                      style={{
                        zIndex:5,
                        textAlign:isMobile ? "center" :"left"
                      }}
                      >
                        {
                          project.title
                        }
                      </motion.h3>
                    )}
                </AnimatePresence>

                <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl 
                  md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7) ] ${
                    isMobile ? "mb-6 rounded-lg":"mb-10 sm:mb-12 rounded-xl"
                  } 
                  h-[62vh] sm:h-[65vh]`}
                  style={{
                    zIndex:10,
                    transition:"box-shadow 250ms ease "
                  }}
                  >
                  <img src={project.image} alt={project.title} 
                  className='w-full object-cover drop-shadow-xl md:drop-shadow-2xl '
                  style={{
                    position:"relative",
                    zIndex:10,
                    filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.65) ",
                    transition:"filter 200ms ease",
                  }}
                  loading='lazy'
                  />
                  <div className='pointer-events-none absolute inset-0 '
                  style={{
                    zIndex:11,
                    background:"linear-gradient(180deg, rgba(0,0,0,0.12) 0% rgba(0,0,0,0) 40% )"
                  }}
                  >
                    
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className={`absolute ${
            isMobile ? "bottom-20":"bottom-0"
          }`}>
            <a href={activeProject ?.link} target='_blank' 
            rel='noopener noreferrer'
            className='cursor-pointer inline-block font-semibold mt-10 border px-6 py-3 rounded-lg text-black bg-white hover:bg-gray-200 transition-all'
            aria-label={`View ${activeProject?.title}`}
            >
              View Project
            </a>
          </div>

      </div>
    </section>
  )
}

export default Projects