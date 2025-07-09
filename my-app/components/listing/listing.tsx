
'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCar, faClock, faMapMarker, faThLarge, faUser } from "@fortawesome/free-solid-svg-icons"
import _sub_avbar from '@/components/listing/sub_navbar'
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';



const Listing = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const searchParams = useSearchParams();
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho', 'tat_ca']
  const list_path: string[] = path_name.split('/')
  let locations = searchParams.get('locations')?.split(',') || ['Thành phố Hồ Chí Minh']
  if (locations[0] === '') {
    locations = ['Thành phố Hồ Chí Minh']
  }
  return (
    <div>
      <div className="w-full xl:w-[1280px] 2xl:w-[1536px] h-auto mx-auto text-white p-2">
        <div className='text-3xl text-white mt-8 flex text-nowrap '>
          <p className='hidden md:flex'>Bất động sản tại:&ensp;</p>
          <div className='flex overflow-auto'>{locations?.map((loc, index) => (
              <p key={index} className='cursor-pointer'>{loc}{(index === locations.length - 1) ? '' : ','}&ensp;</p>
          ))}</div>
        </div>

        <_sub_avbar/>
        <div className={category.includes(list_path[2]) ? "max-h-[100vh] overflow-auto mx-4 bg-none px-2 xl:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8" : "hidden"}>
          {items.map((item) => (
            <div key={item} className=" bg-gray-600 rounded-sm text-center">

              <div className=''>
              <img src='/img/showcase.png' alt="" className="min-w-full"/>
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
                    <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> Bedrooms: {item}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faBath}></FontAwesomeIcon> Bathroom: 2
                  </div>
                </div>
                <div className='w-full h-auto border-t-[1px] border-gray-500 border-solid text-left py-4 px-2'>
                  <div>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Nguyen Van A
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 1 year
                  </div>
                </div>
                <div className='w-full h-auto border-t-[1px] border-gray-500 border-solid text-left py-8 px-2'>
                  <Link href={`${path_name}/show/displayer`}><div className='btn bg-blue-950 text-white w-full'>More Infor</div></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Listing