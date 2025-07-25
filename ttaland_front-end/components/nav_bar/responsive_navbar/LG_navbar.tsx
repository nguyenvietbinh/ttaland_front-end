'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search_bar from '../filter/filter';
import { useEffect, useState } from 'react';

const LG_navbar = () => {
  const path_name = usePathname()
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => {setWidth(window.innerWidth)});
    return () => window.removeEventListener('resize', () => {setWidth(window.innerWidth)});
  }, []);
  return (
    <div>
      {((width > 1024) && (width < 1280)) ? (
      <div className='flex gap-6 justify-start w-[1024px] mx-auto text-gray-300 text-xl'>
        <Link href="/"><img src="/img/logo.png" alt="" className='h-24'/></Link>
        <Link href='/tin_tuc' className={path_name === '/tin_tuc' ? 'my-auto text-white' : 'my-auto group hover:text-white'}>
          Tin Tức
          <div className={path_name === '/tin_tuc' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
        </Link>
        <div className="dropdown dropdown-hover flex group/main"> 
          <div tabIndex={0} className={path_name.includes('/san_pham_ban') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Bán
            <img src="/img/icons/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
            <li className='py-2.5'><Link href='/san_pham_ban/nha_pho' className={path_name === '/san_pham_ban/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
              <div className={path_name === '/san_pham_ban/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_ban/biet_thu' className={path_name === '/san_pham_ban/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
              <div className={path_name === '/san_pham_ban/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_ban/dat_nen' className={path_name === '/san_pham_ban/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
              <div className={path_name === '/san_pham_ban/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_ban/can_ho' className={path_name === '/san_pham_ban/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
              <div className={path_name === '/san_pham_ban/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
          </ul>
        </div>
        <div className="dropdown flex dropdown-hover group/main"> 
          <div tabIndex={0} className={path_name.includes('/san_pham_cho_thue') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Cho Thuê
            <img src="/img/icons/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
            <li className='py-2.5'><Link href='/san_pham_cho_thue/nha_pho' className={path_name === '/san_pham_cho_thue/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
              <div className={path_name === '/san_pham_cho_thue/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_cho_thue/biet_thu' className={path_name === '/san_pham_cho_thue/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
              <div className={path_name === '/san_pham_cho_thue/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_cho_thue/dat_nen' className={path_name === '/san_pham_cho_thue/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
              <div className={path_name === '/san_pham_cho_thue/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/san_pham_cho_thue/can_ho' className={path_name === '/san_pham_cho_thue/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
              <div className={path_name === '/san_pham_cho_thue/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
          </ul>
        </div>
        <div className="dropdown flex dropdown-hover group/main"> 
          <div tabIndex={0} className={path_name.includes('/du_an') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Dự Án Mới
            <img src="/img/icons/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 w-40 p-4 text-center">
            <li className='py-2.5'><Link href='/du_an/nha_pho' className={path_name === '/du_an/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
              <div className={path_name === '/du_an/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/du_an/biet_thu' className={path_name === '/du_an/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
              <div className={path_name === '/du_an/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/du_an/dat_nen' className={path_name === '/du_an/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
              <div className={path_name === '/du_an/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
            <li className='py-2.5'><Link href='/du_an/can_ho' className={path_name === '/du_an/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
              <div className={path_name === '/du_an/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
            </Link></li>
          </ul>
        </div>
        <div className='ml-auto flex'>
          <Search_bar modal_name='lg_navbar'/>
          <div className="dropdown flex dropdown-hover group/main"> 
              <div tabIndex={0} className="flex">
                <img src="/img/icons/bars.png" alt="" className='bars h-7 my-auto mx-4'/>
              </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 right-0 p-4 text-center">
              <li className='py-2.5'><Link href='/lien_he' className={path_name === '/lien_he' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Liên Hệ
                <div className={path_name === '/lien_he' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/sale' className={path_name === '/sale' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Sản Phẩm
                <div className={path_name === '/sale' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/login' className={path_name === '/login' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Nhập
                <div className={path_name === '/login' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
            </ul>
          </div>
        </div>

      </div>
      ) : (
        <div></div>
      )}

    </div>
  )
}


export default LG_navbar