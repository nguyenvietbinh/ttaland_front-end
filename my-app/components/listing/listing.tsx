
'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCar, faClock, faMapMarker, faThLarge, faUser } from "@fortawesome/free-solid-svg-icons"
import _sub_avbar from '@/components/listing/sub_navbar'
import { usePathname } from 'next/navigation';
import Link from 'next/link';



const Listing = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  let title = ''
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho']
  const list_path: string[] = path_name.split('/')
  if (list_path[1] === 'san_pham_ban') {
    title = 'Sản Phẩm Bán'
  } else if (list_path[1] === 'san_pham_cho_thue') {
    title = 'Sản Phẩm Cho Thuê'
  } else if (list_path[1] === 'du_an') {
    title = 'Dự Án'
  }
  return (
    <div className=''>
      <div className="w-full xl:w-[1280px] 2xl:w-[1536px] h-auto mx-auto mt-10 text-white">
        <div className='text-4xl md:text-5xl text-center text-white my-8'>{title} Nổi Bật</div>
        <_sub_avbar/>
        <div className={category.includes(list_path[2]) ? "h-auto mx-4 bg-none px-2 xl:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8" : "hidden"}>
          {items.map((item) => (
            <div key={item} className=" bg-gray-600 rounded-sm text-center">
              <div className='absolute'>  
                <div className='m-4 py-1 px-3 inline-block bg-gray-700 text-white rounded-sm opacity-90'>800.000.000 VND</div>
              </div>
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
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Nguyen Viet Binh
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