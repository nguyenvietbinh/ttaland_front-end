import Link from "next/link";

interface BackButtonProps {
  href?: string;
}


const BackButton = ({ href = "/"}: BackButtonProps) => {
  return (
    <div className='fixed top-4 left-4 z-50'>
      <Link href={href} className="btn btn-circle btn-outline btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>
    </div>
  );
};


export default BackButton;