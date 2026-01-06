import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ParticlesBackground from '../Components/ParticlesBackground'
import emailjs from "@emailjs/browser"
import Astra from "../assets/Astra.png"

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    service:"",
    budget:"",
    idea:"",
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")

  const handleChange=(e)=>{
    const {name , value} = e.target
    if(name==="budget" && value < 0 && !/^\d+$/.test(value)) return;
    setFormData((p)=>({...p, [name]:value}))
    if(errors[name]){
      setErrors(({...p,[name]:"" }))
    }
  }

  const validateForm=()=>{
    const required = ["name","email","service","idea"];
    const newErrors={};
    required.forEach((f)=>!formData[f].trim() && (newErrors[f]="Fill the details in this feild"))
    if(formData.service !=="other" && !formData.budget.trim()){
      newErrors.budget="Fill this feild";
    }
    setErrors(newErrors)
    return !Object.keys(newErrors).length;
  }

  const handleSumbit = async(e)=>{
    e.preventDefault();
    if(!validateForm()) return ;
    setStatus("sending")
    try{
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          form_name:formData.name,
          reply_to:formData.email,
        },
        PUBLIC_KEY
      );
      setStatus("success")
      setFormData({
        name:"",
        email:"",
        service:"",
        budget:"",
        idea:"",
      })
    } catch(err) {
      console.log("EmailJS Error: ",err)
      setStatus("error")
    }
  }

  return (
  <section id='contact' className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>
    <ParticlesBackground/>
    <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10  '>
      <motion.div className='w-full md:w-1/2 flex justify-center'
      initial={{opacity:0 ,x:-50}}
      whileInView={{opacity:1 ,x:0}}
      transition={{duration:0.6}}
      >
        <motion.img src={Astra} alt="Contact" className='w-72 md:w-140 rounded-2xl shadow-lg object-cover'
        animate={{y:[0,-10,0]}}
        transition={{duration:2 , repeat:Infinity , ease:"easeInOut" }}
        />
      </motion.div>
      <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
      initial={{opacity:0 ,x:50}}
      whileInView={{opacity:1 ,x:0}}
      transition={{duration:0.6}}
      >
        <h2 className='text-3xl font-bold mb-6  '>Let's Work Together</h2>

        <form className='flex flex-col gap-5' onSubmit={handleSumbit}
        >
          <div className='flex flex-col'>
            <label className='mb-1'>Your Name<span className='text-red-500'> * </span></label>
            <input type="text" name='name' placeholder='Your Name'
            value={formData.name} onChange={handleChange}
            className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `}
            />
            {errors.name && <p className="text-red-500 text-xs "></p> }
          </div>
        </form>

      </motion.div>
    </div>
    
  </section>
  )
}

export default Contact