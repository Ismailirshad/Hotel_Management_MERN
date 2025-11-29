import React from 'react'
// import {locationIcon} from '../assets/assets.js'
import { assets } from '../assets/assets.js'
import { FaAssistiveListeningSystems } from 'react-icons/fa'
const Hero = () => {
  return (
    <div id="home" className='w-full h-screen bg-[url("/hero-img.jpg")] bg-center  bg-cover relative'>
      <div className="flex items-center px-40  w-full h-screen">
        <div className="flex flex-col items-start space-y-3 pt-44">
          <h1 className='text-slate-300 text-2xl'>The Ultimate Hotel Experience</h1>
          <h1 className="text-5xl text-slate-300 font-extrabold">Sleep Like a Baby</h1>
          <p className='text-slate-100'>Luxury and comfort await at the world's most <br />
            exclusive hotels and resorts. Start your booking today</p>
          <div className="bg-slate-100 flex space-x-2 p-3 rounded-lg">
            <form class="flex  mx-auto justify-around text-center gap-3 ">
              <div className="flex flex-col items-center">
                <label for="countries" class="items-center mb-2.5 text-sm font-medium text-heading flex">  <img  src={assets.locationIcon} alt="" className='h-6 w-6' />Destination</label>
                <select id="countries" class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>

              <div className="flex flex-col items-center ">
                <label for="countries" class="flex items-center  mb-2.5 text-sm font-medium text-heading"> <img  src={assets.calenderIcon} alt="" className='h-6 w-6 mr-1' />Select Date</label>

                <div id="date-range-picker" date-rangepicker class="flex items-center">
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
                    </div>
                    <input id="datepicker-range-start" name="start" type="date" class="block w-full ps-9 pe-3  bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Select date start" />
                  </div>
                  <span class="mx-4 text-body">to</span>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" /></svg>
                    </div>
                    <input id="datepicker-range-end" name="end" type="date" class="block w-full ps-9 pe-3  bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Select date end" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center  ">
                <label for="countries" class="flex items-center mb-2.5 text-sm font-medium text-heading "> <img src={assets.userIcon} alt='' className='h-6 w-6 bg-black rounded-full mr-1' />Guest</label>
                <input type="number" min="1" max="4" class="block w-full px-5 py-2.5 bg-neutral-secondary-medium  text-black border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="1" />
              </div>

              <div className="flex flex-col items-center justify-center">
                <button className="bg-black text-white px-4 py-2 rounded-sm">Search</button>

              </div>

            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Hero
