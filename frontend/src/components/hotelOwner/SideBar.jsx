import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets';

const SideBar = () => {
    const navLinks = [{name: 'Dashboard', path: '/owner', icon: assets.dashboardIcon},
         {name: 'Add Room', path: '/owner/addRoom', icon: assets.addIcon},
          {name: 'List Room', path: '/owner/listRoom', icon: assets.listIcon}];
  return (
    <div className='flex flex-col md:w-56 w-28  py-10 items-center h-screen  border-r  border-gray-400'>
      {navLinks.map((link, index) => (
        <NavLink 
          key={index}
          to={link.path}
          end={'/owner'}
           className={({ isActive }) =>`flex items-center py-3  px-4 md:px-8 gap-3 
           ${isActive ? 
            "border-r-4 md:border-r-[6px] bg-blue-600/10 border-indigo-500 text-indigo-600" 
            : "hover:bg-gray-100/90 border-white text-gray-700"}` }
          >
            <img src={link.icon} alt="" />
            <p className="md:block hidden text-center">{link.name}</p>
            </NavLink>
        )
        
        )}

       
    </div>
  )
}

export default SideBar
