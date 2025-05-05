'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCar, faClock, faMapMarker, faThLarge, faUser } from "@fortawesome/free-solid-svg-icons"
import Image from 'next/image';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
const height = []
for (let i = 0; i < items.length; i ++) {
  height.push(`h-[${i+1}vh]`)
}
console.log(JSON.stringify(height))
const list = () => {
  return (
    <div className="w-full bg-gray-300 text-gray-950 pt-8">
      <div className="h-auto mx-[4vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[4vw]">
        {items.map((item) => (
          <div key={item} className="inline-block bg-gray-400 text-center">
            <div className='absolute'>
              <div className='m-4 py-1 px-3 inline-block bg-gray-700 text-white rounded-sm opacity-90'>1000$</div>
            </div>
            <div className='first_layout'>
            <img src="/img/showcase.png" alt="" className="w-full"/>
              <div className="w-full h-auto border-t-[1px] border-gray-500 border-solid px-2">
                <p className="text-2xl my-2">Property Name</p>
                <span>
                  <FontAwesomeIcon icon={faMapMarker} className="mr-1"></FontAwesomeIcon>
                </span>
                <span>Location, loc</span>
              </div>
              <div className='w-full h-auto border-t-[1px] border-gray-500 border-solid grid grid-cols-2 text-left py-4 px-2'>
                <div>
                  <FontAwesomeIcon icon={faThLarge} className='mr-1'></FontAwesomeIcon> Sqft: 1000
                </div>
                <div>
                  <FontAwesomeIcon icon={faCar}></FontAwesomeIcon> Garage: 2
                </div>
                <div>
                  <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> Bedrooms: 4
                </div>
                <div>
                  <FontAwesomeIcon icon={faBath}></FontAwesomeIcon> Bathroom: 2
                </div>
              </div>
              <div className='w-full h-auto border-t-[1px] border-gray-500 border-solid text-left py-4 px-2'>
                <div>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Nguyen Viet Binh
                </div>
                <div>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 1 year
                </div>
              </div>
              <div className='w-full h-auto border-t-[1px] border-gray-500 border-solid text-left py-8 px-2'>
                <div className='btn bg-blue-950 w-full'>More Infor</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default list