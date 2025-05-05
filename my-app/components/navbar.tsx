'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';



const _navbar = () => {
  return (
    <div tabIndex={0} className="text-white bg-blue-950 sticky top-0 z-50 collapse md:collapse-open md:flex rounded-none">
      <div className="flex justify-between">
        <div className="pl-[3vw]">
          <a className="" href="/">
            <img src="/img/logo.png" alt="" className="h-[10vh] w-auto md:w-[12vh]"/>
          </a>
        </div>
        <div className="items-center my-auto mr-[4vw] md:hidden rotate-0">
          <img src="/img/bars.png" className="h-[3vh] w-auto" alt="" />
        </div>
      </div>
      <div className="collapse-content pl-[4vw] md:p-0 md:pt-4 md:my-auto md:mr-[4vw] md:w-full">
        <ul className='md:flex space-y-4 md:space-y-0 md:space-x-[1.5vw]'>
          <li className='md:mx-[1.5vw]'>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/listing">FEATURED LISTINGS</a>
          </li>
          <li className='md:ml-auto'>
            <a href="">
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
              <span className='ml-1'>REGISTER</span>
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
              <span className='ml-1'>LOGIN</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}



export default _navbar