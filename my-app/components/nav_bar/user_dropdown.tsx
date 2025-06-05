'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const User_dropdown = () => {
  const path_name = usePathname()
  return (
    <div className="flex">
      <div className="dropdown flex dropdown-hover group/main"> 
        <div tabIndex={0} className="flex">
          <img src="/img/user.png" alt="" className='bars h-10 my-auto mx-4'/>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-blue-950 border-[1px] border-solid border-black mt-24 z-1 right-0 p-4 text-center">
          <li className='py-2.5'><Link href='/login' className={path_name === '/login' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Nhập
            <div className={path_name === '/login' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
          </Link></li>
          <li className='py-2.5'><Link href='/dang_ki' className={path_name === '/dang_ki' ? 'cursor-pointer text-white inline-block whitespace-nowrap group' : 'cursor-pointer hover:text-white inline-block whitespace-nowrap group'}>Đăng Kí 
            <div className={path_name === '/dang_ki' ? 'h-0.5 w-full bg-white' : 'h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500'}></div>  
          </Link></li>
        </ul>
      </div>
    </div>
  )
}


export default User_dropdown