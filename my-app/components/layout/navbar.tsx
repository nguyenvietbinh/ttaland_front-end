'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const path_name = usePathname()
  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 w-full opacity-90 h-auto">
        {/* laptop part */}

        <div className='xl:flex gap-6 justify-start xl:w-[1280px] 2xl:w-[1536px] mx-auto text-gray-300 text-xl hidden'>
          <Link href="/"><img src="/img/logo.png" alt="" className='h-20 xl:h-24'/></Link>
          <div className='flex'>
            <Link href="/" className={path_name === '/' ? 'my-auto text-white' : 'my-auto group hover:text-white'}>
              Trang Chủ
              <div className={path_name === '/' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
            </Link>
          </div>
          <div className="dropdown dropdown-hover flex group/main"> 
            <div tabIndex={0} className={path_name.includes('/san_pham_ban') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Bán
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
              <li className='py-2.5'><Link href='/san_pham_ban/dat_nen' className={path_name === '/san_pham_ban/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
                <div className={path_name === '/san_pham_ban/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_ban/nha_pho' className={path_name === '/san_pham_ban/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
                <div className={path_name === '/san_pham_ban/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_ban/biet_thu' className={path_name === '/san_pham_ban/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
                <div className={path_name === '/san_pham_ban/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_ban/can_ho' className={path_name === '/san_pham_ban/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
                <div className={path_name === '/san_pham_ban/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
            </ul>
          </div>
          <div className="dropdown flex dropdown-hover group/main"> 
            <div tabIndex={0} className={path_name.includes('/san_pham_cho_thue') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Sản Phẩm Cho Thuê
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
              <li className='py-2.5'><Link href='/san_pham_cho_thue/dat_nen' className={path_name === '/san_pham_cho_thue/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
                <div className={path_name === '/san_pham_cho_thue/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_cho_thue/nha_pho' className={path_name === '/san_pham_cho_thue/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
                <div className={path_name === '/san_pham_cho_thue/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_cho_thue/biet_thu' className={path_name === '/san_pham_cho_thue/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
                <div className={path_name === '/san_pham_cho_thue/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/san_pham_cho_thue/can_ho' className={path_name === '/san_pham_cho_thue/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
                <div className={path_name === '/san_pham_cho_thue/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
            </ul>
          </div>
          <div className="dropdown flex dropdown-hover group/main"> 
            <div tabIndex={0} className={path_name.includes('/du_an') ? "flex my-auto cursor-pointer text-white" : "flex my-auto cursor-pointer group-hover/main:text-white"}>Dự Án
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 w-40 p-4 text-center">
              <li className='py-2.5'><Link href='/du_an/dat_nen' className={path_name === '/du_an/dat_nen' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đất Nền
                <div className={path_name === '/du_an/dat_nen' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/du_an/nha_pho' className={path_name === '/du_an/nha_pho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Nhà Phố
                <div className={path_name === '/du_an/nha_pho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/du_an/biet_thu' className={path_name === '/du_an/biet_thu' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Biệt Thự
                <div className={path_name === '/du_an/biet_thu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/du_an/can_ho' className={path_name === '/du_an/can_ho' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Căn Hộ
                <div className={path_name === '/du_an/can_ho' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
              </Link></li>
            </ul>
          </div>
          <Link href='/gioi_thieu' className={path_name === '/gioi_thieu' ? 'my-auto text-white' : 'my-auto group hover:text-white'}>
            Giới Thiệu
            <div className={path_name === '/gioi_thieu' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
          </Link>
          <Link href='/tuyen_dung' className={path_name === '/tuyen_dung' ? 'my-auto text-white' : 'my-auto group hover:text-white'}>
            Tuyển Dụng
            <div className={path_name === '/tuyen_dung' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>
          </Link>
          <div className='p-4 ml-auto flex justify-between'>
            <div className='flex gap-2 my-auto'><Link href='/login' className='my-auto group hover:text-white'>Đăng Nhập<div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div></Link></div>
            <FontAwesomeIcon icon={faSignIn} className='my-auto pl-2'></FontAwesomeIcon>
          </div>
        </div>


        {/* mobile part */}

        <div className="flex justify-between xl:hidden text-gray-300">
          <Link href="/"><img src="/img/logo.png" alt="" className='h-20 xl:h-24'/></Link>
          <div className="dropdown dropdown-end my-auto">
            <div tabIndex={0} className="">
              <img src="/img/bars.png" alt="" className='bars h-8 my-auto mx-4'/>
            </div>
          <div tabIndex={0} className="dropdown-content text-2xl bg-blue-950 mt-6 whitespace-nowrap border-[1px] border-solid rounded-lg absolute -top-12 border-gray-600">
            <div className={path_name === '/' ? 'p-4 text-2xl flex text-white justify-between' : 'p-4 text-2xl flex justify-between'}>
              <Link href='/'>Trang Chủ</Link>
              <p className={path_name === '/' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className={path_name.includes('/san_pham_ban') ? "collapse-title text-white" : "collapse-title"}>Sản Phẩm Bán</div>
              <div className="collapse-content py-0">
                <div className={path_name === '/san_pham_ban/dat_nen' ? 'flex justify-between pl-2 text-white text-xl' : 'flex justify-between pl-2 text-xl'}>
                  <Link href='/san_pham_ban/dat_nen'>Đất Nền</Link>
                  <p className={path_name === '/san_pham_ban/dat_nen' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_ban/nha_pho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_ban/nha_pho'>Nhà Phố</Link>
                  <p className={path_name === '/san_pham_ban/nha_pho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_ban/biet_thu' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_ban/biet_thu'>Biệt Thự</Link>
                  <p className={path_name === '/san_pham_ban/biet_thu' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_ban/can_ho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_ban/can_ho'>Căn Hộ</Link>
                  <p className={path_name === '/san_pham_ban/can_ho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className={path_name.includes('/san_pham_cho_thue') ? "collapse-title text-white" : "collapse-title"}>Sản Phẩm Cho Thuê</div>
              <div className="collapse-content py-0">
                <div className={path_name === '/san_pham_cho_thue/dat_nen' ? 'flex justify-between pl-2 text-white text-xl' : 'flex justify-between pl-2 text-xl'}>
                  <Link href='/san_pham_cho_thue/dat_nen'>Đất Nền</Link>
                  <p className={path_name === '/san_pham_cho_thue/dat_nen' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_cho_thue/nha_pho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_cho_thue/nha_pho'>Nhà Phố</Link>
                  <p className={path_name === '/san_pham_cho_thue/nha_pho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_cho_thue/biet_thu' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_cho_thue/biet_thu'>Biệt Thự</Link>
                  <p className={path_name === '/san_pham_cho_thue/biet_thu' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/san_pham_cho_thue/can_ho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/san_pham_cho_thue/can_ho'>Căn hộ</Link>
                  <p className={path_name === '/san_pham_cho_thue/can_ho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className={path_name.includes('/du_an') ? "collapse-title text-white" : "collapse-title"}>Dự Án</div>
              <div className="collapse-content py-0">
                <div className={path_name === '/du_an/dat_nen' ? 'flex justify-between pl-2 text-white text-xl' : 'flex justify-between pl-2 text-xl'}>
                  <Link href='/du_an/dat_nen'>Đất Nền</Link>
                  <p className={path_name === '/du_an/dat_nen' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/du_an/nha_pho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/du_an/nha_pho'>Nhà Phố</Link>
                  <p className={path_name === '/du_an/nha_pho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/du_an/biet_thu' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/du_an/biet_thu'>Biệt Thự</Link>
                  <p className={path_name === '/du_an/biet_thu' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
                <div className={path_name === '/du_an/can_ho' ? 'flex justify-between pt-2 pl-2 text-white text-xl' : 'flex justify-between pt-2 pl-2 text-xl'}>
                  <Link href='/du_an/can_ho'>Căn hộ</Link>
                  <p className={path_name === '/du_an/can_ho' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
                </div>
              </div>
            </div>
            <div className={path_name === '/gioi_thieu' ? 'p-4 flex justify-between text-white text-2xl' : 'p-4 flex justify-between text-2xl'}>
              <Link href="/gioi_thieu">Giới Thiệu</Link>
              <p className={path_name === '/gioi_thieu' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
            </div>
            <div className={path_name === '/tuyen_dung' ? 'p-4 flex justify-between text-white text-2xl' : 'p-4 flex justify-between text-2xl'}>
              <Link href="/tuyen_dung">Tuyển Dụng</Link>
              <p className={path_name === '/tuyen_dung' ? 'pt-1 pr-1' : 'pt-1 pr-1 hidden'}>*</p>
            </div>
            <div className='p-4 flex justify-between'>
              <div className='flex'><Link href='/login' className='text-2xl'>Đăng Nhập</Link></div>
              <FontAwesomeIcon icon={faSignIn} className='my-auto'></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Navbar