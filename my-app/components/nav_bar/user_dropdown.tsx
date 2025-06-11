'use client'

import Link from "next/link"


const User_dropdown = () => {
  return (
    <Link href='/login' className="flex h-10 my-auto mx-4 tooltip tooltip-bottom" data-tip="Đăng Nhập">
      <img src="/img/user.png" alt="" className='cursor-pointer'/>
    </Link>
  )
}


export default User_dropdown