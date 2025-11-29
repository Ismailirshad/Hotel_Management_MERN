import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/hotelOwner/SideBar'
import Navbar from '../../components/hotelOwner/Navbar'

const Layout = () => {
    const [openSideBar , setOpenSideBar] = useState(false);
  return (
    <div className='flex flex-col h-screen' >
       <Navbar toggleSidebar={()=> setOpenSideBar(!openSideBar)} />
        <div className="flex h-full">
        <div className={`${openSideBar? "block " : "hidden"} md:flex`}>
        <SideBar />
      </div>

        <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
      <Outlet />
        </div>
        </div>
    </div>
  )
}

export default Layout
