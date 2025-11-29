import React from 'react'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col">

        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl">Dashboard</h1>
          <p className="text-md">Monitor your room listings, track bookings and analyze revenue-all in one place <br />
            Stay updated with real time insights to ensure smooth operation</p>
        </div>

        <div className="flex pt-5 gap-5">
          <div className="bg-blue-400/10 p-4 flex gap-4 justify-center items-center  rounded-xl">
            <div className='flex'>
              <img src={assets.totalBookingIcon} alt="" className='w-10 h-10 rounded-full' />
            </div>
            <div className="">
              <p className='text-center text-lg font-semibold  text-indigo-800 border-b border-gray-400'>Total Bookings</p>
              <p className=' w-full text-center font-semibold'>{dashboardDummyData.totalBookings}</p>
            </div>
          </div>

          <div className="bg-blue-400/10 p-4 flex gap-4 justify-center items-center  rounded-xl">
            <div className='flex'>
              <img src={assets.totalRevenueIcon} alt="" className='w-10 h-10 rounded-full' />
            </div>
            <div className="">
              <p className='text-center text-lg font-semibold  text-indigo-800 border-b border-gray-400'>Total Revenue</p>
              <p className=' w-full text-center font-semibold'>{dashboardDummyData.totalRevenue}</p>
            </div>
          </div>
        </div>


        <div className="flex flex-col py-5 gap-3">
          <h1 className='text-lg '>Recent Bookings</h1>
          <table className='max-w-4xl w-full border border-gray-300 text-left'>
            <thead className='bg-gray-100 text-md border-b border-gray-400 '>
              <tr>
                <th className='px-4 py-2'>User Name</th>
                <th className='px-4 py-2'>Room Name</th>
                <th className='px-4 py-2'>Total Amount</th>
                <th className='px-4 py-2'>Payment Status</th>
              </tr>
            </thead>
            <tbody className='bg-white' >
              {dashboardDummyData?.bookings?.map((booking, index) => (
                <tr key={index} className='border-t border-gray-400'>
                  <td className='px-4 py-2'>
                    {booking?.user?.username}
                  </td>
                  <td className='px-4 py-2'>{booking.room.roomType}</td>
                  <td className='px-4 py-2' >{booking.totalPrice}</td>
                  <td className='px-4 py-2 '>
                    <button className={`py-1 px-3 text-sm text-center rounded-full mx-auto ${booking.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'} `}>
                      {booking.isPaid ? "Completed" : "Pending"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  )
}

export default Dashboard
