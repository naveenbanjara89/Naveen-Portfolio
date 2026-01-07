import React, { useMemo, useState } from 'react'
import { motion, scale, spring} from "framer-motion"
import ParticlesBackground from "../Components/ParticlesBackground"
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import avatar from '../assets/avatar.png'

const socials=[
  {Icon:FaLinkedin,label:'LinkedIn',link:'https://www.linkedin.com/in/naveen-banjara-88734924b/'},
  {Icon:FaGithub,label:'GitHub',link:'https://github.com/naveenbanjara89'}
]

const glowVariants={
  initial:{scale:1 ,y:0,filter:'drop-shadow(0 0 10px rgba(0,0,0,0) '},
  hover:{scale:1.2 ,y:-3,
  filter:'drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.9)) ',
  transition:{type:"spring", stiffness:300, damping:15}
  },
  tap:{scale:0.95,y:0,transition:{duration:0.08}}
}

const Home = () => {

  const roles=useMemo(()=>["Web Developer","Software Developer"],[])

  const [index, setIndex] = React.useState(0)
  const [subIndex, setSubIndex] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const current =roles[index]
    const timeout=setTimeout(()=>{
      if(!deleting && subIndex<current.length ) setSubIndex(v=>v+1);
      else if(!deleting && subIndex === current.length ) setTimeout(()=>setDeleting(true),1200);
      else if(deleting && subIndex>0 ) setSubIndex(v=>v-1);
      else if(deleting && subIndex === 0 ) {
        setDeleting(false);
        setIndex(p=>(p+1)%roles.length)
      }
    },deleting ? 40:60)

    return ()=>clearTimeout(timeout)
  }, [subIndex,deleting,index,roles])
  

  return (
    <section id='home' className='w-full h-screen relative bg-black '>
      <ParticlesBackground/>
      <div className='absolute inset-0 '>
        <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[z-500vw] md::w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse ' ></div>
        <div className='absolute bottom-0 right-0 w-[70vw] sm:w-[z-500vw] md::w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500  '></div>
      </div>

      <div className='relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2  '>
        <div className='flex flex-col justify-center h-full text-center lg:text-left relative '>
          <div className='w-full lg:pr-24 mx-auto max-w-[48rem] '>
            <motion.div className='mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6rem] ' 
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}} >
              <span>
                {roles[index].substring(0,subIndex) }
              </span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle' style={{height:"1em"}}></span>
            </motion.div>
            <motion.h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#00ffea] via-[#00b3ff] to-[#ff00c8] bg-clip-text text-transparent '
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}} >
              Hello, I'm
              <br/>
              <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap'>
                Naveen Banjara
              </span>
            </motion.h1>
            <motion.p className='mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 text-gray-300'
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.8,delay:0.4}} >I turn complex ideas into seamless, high-impact web experiences — building modern, scalable, and lightning-fast applications that make a difference.</motion.p>
            <motion.div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'
            initial={{opacity:0,}}
            animate={{opacity:1,}}
            transition={{duration:0.8,delay:0.8}} >
              <a href='#projects' className='px-6 py-3 font-medium text-lg bg-gradient-to-r  from-[#302b63] via-[#00bf8f] to-[#1cd8d2] rounded-full shadow-lg hover:scale-105 transition-all  '>View My Work </a>
              <a id='resume' href='/NaveenBanjaraResume.pdf' download className='px-6 py-3 rounded-full text-lg font-medium bg-white text-black hover:bg-gray-200 shadow-lg hover:scale-105 transition-all  '>My Resume </a>
              
            </motion.div>
          </div>
          <div className='mt-10 flex gap-5 md:text-3xl justify-center lg:justify-start gap-6 '>
              {socials.map(({Icon,label,link})=>(
                <motion.a className=' text-gray-300 cursor-pointer hover:scale-105' 
                  href={link}
                  key={label}
                  target='_blank'
                  aria-label={label}
                  rel='noopener noreferrer'
                  variants={glowVariants}
                  initial='initial'
                  whileHover='hover'
                  whileTap='tap'>
                  <Icon/>
                </motion.a>
              ))}
            </div>
        </div>
        <div className="relative hidden lg:block">
          <div className='absolute top-1/2 -translate-y-1/2 pointer-events-none' 
          style={{
            right:'10px',width:"min(22vw,410px)",height:"min(40vw,760px)", borderRadius:"50%",
            filter:"blur(38px)",opacity:0.32,
            background:"conic-gradient(from 0deg ,#1cd8d2 ,#00bf8f , #302b63 ,#1cd8d2 ) "

          }}
          />
        <motion.img src={avatar} alt="Naveen Banjara"
        className="absolute top-1/2 -translate-y-1/2 object-contain cursor-pointer select-none pointer-events-none "
        style={
          {right:"-30px",width:"min(45vw,780px)",maxHeight:"90vh "}
        }
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        />
      </div>
      </div>
      

    </section>
  )
}

export default Home