import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find(room => room._id === id)
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [])

  return (
    <div className='w-full min-h-screen'>
      <div className="max-w-7xl flex flex-col mx-auto pt-28 ">

        <div className="w-full flex flex-col ">
          <div className="flex flex-col justify-center items-start gap-3">
            <div className="flex flex-row justify-center items-center space-x-4 ">
              <h1 className="text-2xl text-black">{room?.hotel.name}</h1>
              <p className='text-md'>[{room?.roomType}]</p>
              <p className='text-sm bg-orange-400 rounded-full px-2  text-white'>20% off</p>
            </div>
            <p >⭐⭐⭐⭐⭐ 200+ reviews</p>
            <p className="text-gray-800/40">{room?.hotel?.address} </p>
          </div>

          <div className="flex flex-col lg:flex-row mt-6 gap-6">
            <div className="lg:w-1/2 w-full">
              <img className='w-full rounded-xl shadow-lg object-cover ' src={mainImage} alt="Room Image" />
            </div>
            <div className="grid grid-cols-2 ap-4 lg:w-1/2 w-full">
              {room?.images.map((img, index) => (
                <div onClick={() => setMainImage(img)} key={index + 1} className="p-2 w-full">
                  <img
                    className={`object-cover cursor-pointer w-full rounded-xl shadow-md ${mainImage === img && 'outline-3 outline-orange-500'} `} src={img} alt={`Room image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>



          <div className='flex flex-col '>
            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-col gap-3 border-b border-gray-400/40  pb-6">
                <h1 className="text-3xl ">Experience Luxury Like Never Before</h1>
                <div className="flex flex-row gap-2">
                  {room?.amenities.map((item, idx) => (
                    <div key={idx} className="flex flex-row items-center gap-1 border-gray-400/40 border p-1 rounded">
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-4 h-4 object-contain"
                      />
                      <span>{item} </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-3xl font-semibold">${room?.pricePerNight}/Day</p>
              </div>
            </div>
          </div>
        </div>

        {/* page 2 */}
        <div className='items-center flex-col gap-3'>
          <div className="flex bg-slate-100 shadow-xl justify-between p-5">
            <div className="flex items-center justify-center ">
              <div className="flex items-center flex-col p-3">
                <h2 className="text-md ">Check In</h2>
                <input type="date" className="text-center text-sm" />
              </div>
              <div className="flex items-center flex-col p-3 border-l border-gray-400/40">
                <h2 className="text-md ">Check Out</h2>
                <input type="date" className="text-center text-sm" placeholder='Add date' />
              </div>
              <div className="flex items-center flex-col border-l border-gray-400/40">
                <h2 className="text-md ">Guests</h2>
                <input type="number" max='4' className="text-center text-sm" placeholder='2 guests' />
              </div>
            </div>
            <div className="flex items-center p-5">
              <button className="bg-blue-500 text-lg px-10 p-3">Check Activity</button>
            </div>
          </div>

          <div className="flex flex-col py-10  ">
            {roomCommonData.map((data, index) => (
              <div key={index} className="flex flex-row items-start space-x-3 py-3 ">
                <img src={data.icon} alt={data.title} className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">{data.title}</h3>
                  <p className="text-gray-600">{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className=" py-5  border-b border-t border-gray-400/40">
            <p className="text-slate-400">
              Guest will be allocatd on the ground floor according to the room availability. You get comfortable Two bedroom apartment has a city feeling <br/>
              The Price quoeted is  for 2 guest, at the guest slot please mark the number of guest to get the exact price of the groups. The Guest will be <br/>
              allocated ground floor according to availabiity.You get comfortable Two bedroom apartment has a city feeling
            </p>
          </div>

            <div className="flex flex-col py-5 border-b border-gray-400/40">
          <h2 className="text-3xl  py-5">Location</h2>
          <p className="text-md">{room?.hotel.address}</p>
          <p className="text-gray-400 text-sm py-2">It's like Home away from Home</p>
            </div>
        </div>

        <div className="flex flex-col items-start gap-4 py-5">
          <div className='flex gap-4'>
            <img src={room?.hotel?.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
          </div>
          <p className="text-lg md:text-xl"> Hosted By {room?.hotel.name}</p>
          <div>
            <p  className='ml-2'>⭐⭐⭐⭐⭐ 200+ reviews</p>
          </div>
          <div className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">Contact Now</div>
        </div>



      </div>
    </div>
  )
}

export default RoomDetails
