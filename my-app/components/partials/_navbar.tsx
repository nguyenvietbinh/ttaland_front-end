'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';


const _navbar = () => {
  return (
      <nav className="w-full inline-block text-white bg-blue-950">
        <div className="flex h-full mx-[2vw]">
          <a className="h-fit mr-[1vw] items-center w-auto my-auto" href="/">
            <img className="h-[10vh] w-auto py-4" src="/img/logo.png" alt="" />
          </a>
          <a className='h-fit mx-[1vw] items-center w-auto my-auto' href="/about">ABOUT</a>
          <a className="mx-[1vw] whitespace-nowrap h-fit items-center w-auto my-auto" href="">FEATURED LISTINGS</a>
          <a className='flex ml-auto mr-[1vw] h-fit items-center w-auto my-auto' href="">
            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
            <p>REGISTER</p>
          </a>
          <a className='flex ml-[1vw] h-fit items-center w-auto my-auto' href="">
            <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
            <p>LOGIN</p>
          </a>
        </div>
      </nav>
  )
}


export default _navbar