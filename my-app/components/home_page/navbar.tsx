'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';



const _navbar = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const a = document.querySelector('.bars')
    console.log('blalb')
    const handleClick = () => {
      console.log(open)
    }
    setOpen(true)
    if (a) {
      a.addEventListener('click', handleClick)
    }
    return () => {
      if (a) {
        a.removeEventListener('click', handleClick)
      }
    }
  }, [open])
  return (
    <div className="text-white bg-blue-950 sticky top-0 z-50 min-w-screen h-auto opacity-95">
      <div className='container min-w-screen xl:min-w-0 xl:w-[1280px] mx-auto'>
        <div className="flex justify-between">
          <a href="/"><img src="/img/logo.png" alt="" className='h-20 xl:h-24'/></a>
          <div className='hidden xl:flex my-auto w-full text-2xl justify-items-stretch'>
            <div className='inline-block p-2 cursor-pointer hover:underline'>Trang Chủ</div>
            <div className='inline-block p-2 cursor-pointer'>Sản Phẩm Bán</div>
          </div>
          <div className="dropdown dropdown-end my-auto xl:hidden">
            <div tabIndex={0} className="">
              <img src="/img/bars.png" alt="" className='bars h-8 my-auto mx-4'/>
            </div>
          <div tabIndex={0} className="dropdown-content text-2xl text-gray-300 bg-blue-950 mt-6 whitespace-nowrap border-[1px] border-solid rounded-lg absolute -top-12 border-gray-600">
            <div className='p-4 text-2xl flex justify-between'>
              <a href='/'>Trang Chủ</a>
              <p className='pt-1 pr-1'>*</p>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Sản Phẩm Bán</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <a href='/sanphamban/dat_nen'>Đất Nền</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/sanphamban/nha_pho'>Nhà Phố</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/sanphamban/biet_thu'>Biệt Thự</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/sanphamban/can_ho'>Căn hộ</a>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Sản Phẩm Cho Thuê</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <a href='/san_pham_ban/dat_nen'>Đất Nền</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/san_pham_ban/nha_pho'>Nhà Phố</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/san_pham_ban/biet_thu'>Biệt Thự</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/san_pham_ban/can_ho'>Căn hộ</a>
                </div>
              </div>
            </div>
            <div tabIndex={0} className="collapse collapse-arrow">
              <div className="collapse-title">Dự Án</div>
              <div className="collapse-content py-0">
                <div className='flex justify-between pl-2 text-xl'>
                  <a href='/du_an/dat_nen'>Đất Nền</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/du_an/nha_pho'>Nhà Phố</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/du_an/biet_thu'>Biệt Thự</a>
                </div>
                <div className='flex justify-between pt-2 pl-2 text-xl'>
                  <a href='/du_an/can_ho'>Căn hộ</a>
                </div>
              </div>
            </div>
            <div className='p-4 text-2xl'>
              <a href="/gioi_thieu">Giới Thiệu</a>
            </div>
            <div className='p-4 text-2xl'>
              <a href="/tuyen_dung">Tuyển Dụng</a>
            </div>
            <div className='p-4 flex justify-between'>
              <div className='flex'><a href='/login' className='text-2xl'>Log in</a>/<a href='/login' className='text-2xl'>Sign up</a></div>
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