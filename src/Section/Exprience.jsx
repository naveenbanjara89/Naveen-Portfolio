import { motion,useScroll,useTransform } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react'

const exprience =[
  {
    role:"Full Stack Web Developer",
    company:"Learn & Build Pvt. Ltd. ",
    duration:"2023",
    description:"Learned full-stack development fundamentals and built a complete project",
  },
  {
    role:"Software Intern",
    company:"Mobzway Tennologies ",
    duration:"July 2024 - October 2024",
    description:"Worked on React.js, Node.js, Firebase, and Phaser-based game development.Implemented user interfaces, API integration, and dynamic UI updates",
  },
  {
    role:"Bachelor of Technology",
    company:"Rajasthan Technical University",
    duration:"2021 - 2025",
    description:"Arya Institute Of Engineering Technology, Computer Science Engineering",
  },
];

function ExprienceItem({exp , idx , start , end , scrollYProgress , layout}){
  const scale = useTransform(scrollYProgress , [start , end] , [0,1] )
  const opacity = useTransform(scrollYProgress , [start , end] , [0,1] )
  const y = useTransform(scrollYProgress , [start , end] , [idx%2 === 0 ? 30: -30 , 0] )
  const x = useTransform(scrollYProgress , [start , end] , [-24 , 0] )

  if(layout==="desktop"){
    return(
      <div className='relative flex justify-center items-center min-w-0'>
        <motion.div className='z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(2555,255,255,0.1)] '
        style={{scale,opacity}}
        >

        </motion.div>
        <motion.div className={`absolute ${idx%2===0 ? "-top-8" :"-bottom-8"} w-[3px] bg-white/40 `}
        style={{height:40,opacity}}
        >

        </motion.div>
        <motion.article className={`absolute ${idx%2===0 ? "bottom-12":"top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/80 rounded-xl p-7 w-[320px] shadow-lg `}
        style={{opacity,y,maxWidth:"90vw"}}
        transition={{duration:0.4,delay:idx*0.15}}
        >
          <h3 className='text-xl font-semibold'>
            {exp.role}
          </h3>
          <p className='text-md text-gray-400 mb-3'>
            {exp.company} | {exp.duration}
          </p>
          <p className='text-gray-300 text-md'>
            {exp.description}
          </p>
        </motion.article>
      </div>
    )
  }
  return (
    <div className='relative flex items-start'>
      <motion.div className='absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(2555,255,255,0.1)] '
      style={{scale,opacity}}
      >

      </motion.div>
      <motion.article className='relative bg-black text-white border-gray-700/70 rounded-xl w-[90vw] p-5 max-w-sm ml-6 shadow-lg'
      style={{opacity , x}}
      transition={{duration:0.4 , delay:idx*0.15}}
      >
        <h3 className='text-lg font-semibold break-words '>
          {exp.role}
        </h3>
        <p className='text-sm text-gray-400 mb-2 break-words' >
          {exp.company} | {exp.duration}
        </p>
        <p className='text-sm text-gray-300 break-words'>
          {exp.description}
        </p>
      </motion.article>
    </div>
  )
}

const Exprience = () => {
  const sceneRef=useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile=()=>setIsMobile(window.innerWidth<768)
    checkMobile()
    window.addEventListener("resize",checkMobile)
    return ()=>window.removeEventListener("resize",checkMobile)
  }, [])

const SCENE_HIEGHT_VH = isMobile ? 160*exprience.length : 120*exprience.length;

const {scrollYProgress} = useScroll({
  target:sceneRef,
  offset:["start start","end end"]
})

const thresholds = useMemo(()=>exprience.map((_,i)=>(i+1)/exprience.length),[])

const lineSize = useTransform(scrollYProgress, (v)=>`${v*100}%`)

  
  return (
    <section id='exprience' className='relative bg-black text-white' >
      <div ref={sceneRef}
      style={{height:`${SCENE_HIEGHT_VH}vh`, minHeight:"120vh" }}
      className='relative'
      >
        <div className='sticky top-0 h-screen flex flex-col  '>
          <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center'>
            Exprience
          </h2>
          <div className='flex flex-1 items-center -mt-20 justify-center p-6 b-10'>
            {!isMobile && (
              <div className='relative w-[1050px] max-w-7xl'>
                <div className='relative h-[6px] bg-white/15 rounded'>
                  <motion.div className='absolute left-0 top-0 h-[6px] bg-white rounded origin-top'
                  style={{width:lineSize}}
                  >

                  </motion.div>
                </div>
                <div className='relative flex justify-between mt-0'>
                  {exprience.map((exp,idx)=>(
                    <ExprienceItem key={idx} exp={exp} idx={idx} 
                    start={idx===0 ? 0 :thresholds[idx-1] }
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className='relative w-full max-w-md'>
                <div className='absolute left-0 top-0 bottom-0 w-[6px] h-[700px] bg-white/15 rounded '>
                  <motion.div className='absolute top-0 left-0  w-[6px] bg-white rounded'
                  style={{height:lineSize}}
                  >

                  </motion.div>
                </div>
                <div className='relative flex flex-col gap-10 mt-6 ml-10 pb-28'>
                  {exprience.map((exp,idx)=>(
                    <ExprienceItem key={idx} exp={exp} idx={idx} 
                    start={idx===0 ? 0 :thresholds[idx-1] }
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Exprience