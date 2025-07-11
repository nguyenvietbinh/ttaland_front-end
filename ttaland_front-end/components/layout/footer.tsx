
'use client'
import Link from "next/link"

const Footer = () => {

  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-neutral mt-[100%] text-neutral-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href='/' className="link link-hover">Branding</Link>
          <Link href='/' className="link link-hover">Design</Link>
          <Link href='/' className="link link-hover">Marketing</Link>
          <Link href='/' className="link link-hover">Advertisement</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href='/' className="link link-hover">About us</Link>
          <Link href='/' className="link link-hover">Contact</Link>
          <Link href='/' className="link link-hover">Jobs</Link>
          <Link href='/' className="link link-hover">Press kit</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href='/' className="link link-hover">Terms of use</Link>
          <Link href='/' className="link link-hover">Privacy policy</Link>
          <Link href='/' className="link link-hover">Cookie policy</Link>
        </nav>
      </footer>
    </div>
  )
}


export default Footer