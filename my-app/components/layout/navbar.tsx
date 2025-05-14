'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';



const _navbar = () => {
  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 min-w-screen h-auto opacity-95">
      <div className='container min-w-screen xl:min-w-0 xl:w-[1280px] 2xl:w-[1536px] mx-auto'>
        {/* laptop part */}

        <div className='xl:flex gap-6 justify-start text-gray-300 text-xl hidden'>
          <Link href="/"><img src="/img/logo.png" alt="" className='h-20 xl:h-24'/></Link>
          <div className='flex'>
            <Link href="/" className='my-auto group hover:text-white'>
              Trang Chủ
              <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>
            </Link>
          </div>
          <div className="dropdown dropdown-hover flex group/main"> 
            <div tabIndex={0} className="flex my-auto cursor-pointer group-hover/main:text-white">Sản Phẩm Bán
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Đất Nền
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Nhà Phố
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Biệt Thự
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Căn Hộ
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
            </ul>
          </div>
          <div className="dropdown flex dropdown-hover group/main"> 
            <div tabIndex={0} className="flex my-auto cursor-pointer group-hover/main:text-white">Sản Phẩm Cho Thuê
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black z-1 w-full mt-24 p-4 text-center">
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Đất Nền
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Nhà Phố
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Biệt Thự
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Căn Hộ
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
            </ul>
          </div>
          <div className="dropdown flex dropdown-hover group/main"> 
            <div tabIndex={0} className="flex my-auto cursor-pointer group-hover/main:text-white">Dự Án
              <img src="/img/arrow.png" className='h-2 my-auto px-2 group-hover/main:rotate-180 transition-all duration-200' alt="" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 w-40 p-4 text-center">
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Đất Nền
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Nhà Phố
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Biệt Thự
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
              <li className='py-2.5'><Link href='/blabla' className='cursor-pointer hover:text-white inline-block whitespace-nowrap group'>Căn Hộ
                <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>  
              </Link></li>
            </ul>
          </div>
          <Link href="/" className='my-auto hover:text-white group'>
            Giới Thiệu
            <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>
          </Link>
          <Link href="/" className='my-auto hover:text-white group'>
            Tuyển Dụng
            <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div>
          </Link>
          <div className='p-4 ml-auto flex justify-between'>
            <div className='flex gap-2 my-auto'><Link href='/login' className='my-auto group hover:text-white'>Log in <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div></Link>/<Link href='/login' className='my-auto group hover:text-white'>Sign up <div className='h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'></div></Link></div>
            <FontAwesomeIcon icon={faSignIn} className='my-auto pl-2'></FontAwesomeIcon>
          </div>
        </div>


        {/* mobile part */}

        <div className="flex justify-between xl:hidden">
          <Link href="/"><img src="/img/logo.png" alt="" className='h-20 xl:h-24'/></Link>
          <div className="dropdown dropdown-end my-auto xl:hidden">
            <div tabIndex={0} className="">
              <img src="/img/bars.png" alt="" className='bars h-8 my-auto mx-4'/>
            </div>
          <div tabIndex={0} className="dropdown-content text-2xl text-gray-300 bg-blue-950 mt-6 whitespace-nowrap border-[1px] border-solid rounded-lg absolute -top-12 border-gray-600">
            <div className='p-4 text-2xl flex justify-between'>
              <Link href='/'>Trang Chủ</Link>
              <p className='pt-1 pr-1'>*</p>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Sản Phẩm Bán</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <Link href='/sanphamban/dat_nen'>Đất Nền</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/sanphamban/nha_pho'>Nhà Phố</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/sanphamban/biet_thu'>Biệt Thự</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/sanphamban/can_ho'>Căn Hộ</Link>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Sản Phẩm Cho Thuê</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <Link href='/san_pham_ban/dat_nen'>Đất Nền</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/san_pham_ban/nha_pho'>Nhà Phố</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/san_pham_ban/biet_thu'>Biệt Thự</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/san_pham_ban/can_ho'>Căn hộ</Link>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Dự Án</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <Link href='/du_an/dat_nen'>Đất Nền</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/du_an/nha_pho'>Nhà Phố</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/du_an/biet_thu'>Biệt Thự</Link>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <Link href='/du_an/can_ho'>Căn hộ</Link>
                </div>
              </div>
            </div>
            <div className='p-4 text-2xl'>
              <Link href="/gioi_thieu">Giới Thiệu</Link>
            </div>
            <div className='p-4 text-2xl'>
              <Link href="/tuyen_dung">Tuyển Dụng</Link>
            </div>
            <div className='p-4 flex justify-between'>
              <div className='flex'><Link href='/login' className='text-2xl'>Log in</Link>/<Link href='/login' className='text-2xl'>Sign up</Link></div>
              <FontAwesomeIcon icon={faSignIn} className='my-auto'></FontAwesomeIcon>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}



export default _navbar