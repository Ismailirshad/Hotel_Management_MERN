import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div className='w-full'>
      <div className="max-w-3xl  space-y-5">
        <h1 className="text-4xl">Room Listings</h1>
        <p className="text-md">View, Edit or manage all listed rooms. Keep the information up-to-date<br />
          to provide the best experience to your customer</p>
      </div>

      <div className="max-w-4xl py-10 gap-4 ">
        <h1 className='text-xl py-2'>All Rooms</h1>
        <table className='w-full text-left border border-gray-400/40' >
          <thead className='py-4 font-semibold text-lg bg-gray-50'>
            <tr>
              <td className='px-2 py-4'>Name</td>
              <td className='px-2 py-4'>Facility</td>
              <td className='px-2 py-4'>Perice / night</td>
              <td className='px-2 py-4'>Actions</td>
            </tr>
          </thead>
          <tbody className='bg-white text-md' >
            {rooms.map((room, index) => (
             <tr key={index} className='border-t border-gray-300'>
              <td className='px-2 py-4' >{room.roomType}</td>
              <td className='px-2 py-4'>{room.amenities.join(', ')}</td>
              <td className='px-2 py-4'>{room.pricePerNight}</td>
              <td className='px-2 py-4 text-red-500 border-t border-gray-300 text-center'>
               <label htmlFor="" className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                <input type="checkbox" className='sr-only peer' checked={room.isAvailable} />
                <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
               </label>
               </td>

             </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom
