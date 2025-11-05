'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {

  const path_name = usePathname()


  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 w-full h-auto">
      <div className='w-[100%] flex mx-auto lg:w-[936px] 2xl:w-[1140px] text-2xl gap-4'>
        <Link href="/"><img src="/img/logo.png" alt="" className='h-24'/></Link>
        <Link href='/tin_tuc' className={path_name === '/tin_tuc' ? 'hidden lg:block my-auto text-white' : 'hidden lg:block my-auto group hover:text-white'}>
          Tin Tức
          <div className={path_name === '/tin_tuc' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
        </Link>
        <div className="dropdown hidden lg:flex dropdown-hover group/main"> 
          <div tabIndex={0} className={path_name?.includes('/san_pham_ban') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Bán
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
        <div className="dropdown hidden lg:flex dropdown-hover group/main"> 
          <div tabIndex={0} className={path_name?.includes('/san_pham_cho_thue') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Cho Thuê
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
        <Link href='/dang_san_pham' className={path_name === '/dang_san_pham' ? 'hidden lg:block my-auto text-white' : 'hidden lg:block my-auto group hover:text-white'}>
          Đăng Sản Phẩm
          <div className={path_name === '/dang_san_pham' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
        </Link>
        <Link href='/login' className={path_name === '/login' ? 'hidden lg:block my-auto text-white ml-auto' : 'hidden lg:block my-auto group hover:text-white ml-auto'}>
          <p>Đăng nhập</p>
          <div className={path_name === '/login' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
        </Link>

        <div className='flex lg:hidden ml-auto'>
          <div className="dropdown ml-auto flex dropdown-hover whitespace-nowrap"> 
              <div tabIndex={0} className="flex">
                <img src="/img/icons/bars.png" alt="" className='bars h-7 my-auto mx-4'/>
              </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 right-0 pr-4 py-4 text-center">
            <div className="dropdown dropdown-left dropdown-hover flex group/san_pham_ban">
            <div tabIndex={0} className={path_name?.includes('/san_pham_ban') ? "flex cursor-pointer text-white mx-auto my-4" : "flex cursor-pointer mx-auto my-4 group-hover/san_pham_ban:text-white"}>Sản Phẩm Bán
              <img src="/img/icons/arrow.png" className='h-2 my-auto px-2 group-hover/san_pham_ban:rotate-180 transition-all duration-200' alt="" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full p-4 text-center">
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
          <div className="dropdown flex dropdown-left dropdown-hover group/sp_cho_thue mx-auto"> 
            <div tabIndex={0} className={path_name?.includes('/san_pham_cho_thue') ? "flex ml-2 my-4 cursor-pointer text-white" : "flex ml-2 my-4 cursor-pointer group-hover/sp_cho_thue:text-white"}>Sản Phẩm Cho Thuê
              <img src="/img/icons/arrow.png" className='h-2 my-auto px-2 group-hover/sp_cho_thue:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full p-4 text-center">
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
              <li className='py-2.5'><Link href='/tin_tuc' className={path_name === '/tin_tuc' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Tin Tức
                <div className={path_name === '/tin_tuc' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/dang_san_pham' className={path_name === '/dang_san_pham' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Sản Phẩm
                <div className={path_name === '/dang_san_pham' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/login' className={path_name === '/login' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Nhập
                <div className={path_name === '/login' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}