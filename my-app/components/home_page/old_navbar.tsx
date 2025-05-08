'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';



const _navbar = () => {
  return (
    <div tabIndex={0} className="text-white bg-blue-950 sticky top-0 z-50 collapse md:collapse-open md:flex rounded-none opacity-95">
      <div className="flex justify-between">
        <div className="pl-[3vw]">
          <Link className="" href="/">
            <img src="/img/logo.png" alt="" className="h-[10vh] w-auto md:w-[12vh]"/>
          </Link>
        </div>
        <div className="items-center my-auto mr-[4vw] md:hidden rotate-0">
          <img src="/img/bars.png" className="h-[3vh] w-auto" alt="" />
        </div>
      </div>
      <div className="collapse-content pl-[4vw] md:p-0 md:pt-4 md:my-auto md:mr-[4vw] md:w-full">
        <ul className='md:flex space-y-4 md:space-y-0 md:space-x-[1.5vw]'>
          <li className='md:mx-[1.5vw] relative group'>
            <Link href="/">TRANG CHU</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group'>
            <Link href="/about">SAN PHAM BAN</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group'>
            <Link href="/listing">SAN PHAM CHO THUE</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group'>
            <Link href="/listing">DU AN</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group'>
            <Link href="/listing">GIOI THIEU</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group'>
            <Link href="/listing">TUYEN DUNG</Link>
            <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='md:ml-auto relative group'>
            <Link href="">
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
              <span className='ml-1'>REGISTER</span>
              <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li className='relative group'>
            <Link href="">
              <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
              <span className='ml-1'>LOGIN</span>
              <span className="absolute hidden md:block bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}



export default _navbar