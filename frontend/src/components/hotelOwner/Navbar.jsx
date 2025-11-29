import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = ({toggleSidebar}) => {
  return (
    <div className='w-full h-16 md:h-32 shadow-lg flex p-4 items-center justify-around  md:justify-between'>
        <img onClick={toggleSidebar} className='md:hidden w-6 h-6' src={assets.listIcon} alt="" />
        <h1 className='text-2xl font-bold text-blue-800 ml-4 text-center '>Hotel Admin</h1>
        <div>

        </div>
      
    </div>
  )
}

export default Navbar
