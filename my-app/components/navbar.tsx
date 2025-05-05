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
          <li className='md:mx-[1.5vw]'>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/listing">FEATURED LISTINGS</Link>
          </li>
          <li className='md:ml-auto'>
            <Link href="">
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
              <span className='ml-1'>REGISTER</span>
            </Link>
          </li>
          <li>
            <Link href="">
              <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
              <span className='ml-1'>LOGIN</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}



export default _navbar