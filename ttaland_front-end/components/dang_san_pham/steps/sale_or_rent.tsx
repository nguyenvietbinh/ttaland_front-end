'use client'

interface Sale_or_rent_props {
  isForSale: boolean
  isForRent: boolean
  setIsForSale: (val: boolean) => void
  setIsForRent: (val: boolean) => void
}


const Sale_or_rent = ({ isForRent, isForSale, setIsForRent, setIsForSale} : Sale_or_rent_props) => {

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-4 w-full">
        <div onClick={() => {setIsForSale(true); setIsForRent(false)}} className={`p-4 cursor-pointer border-1 border-black shadow-md hover:bg-gray-200 rounded-3xl w-full`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0D1011">
            <path d={isForSale ? 'M2 4.75A2.75 2.75 0 0 1 4.75 2h6.412c.729 0 1.428.29 1.944.805l8.01 8.01a2.75 2.75 0 0 1 0 3.89l-6.411 6.411a2.75 2.75 0 0 1-3.89 0l-8.01-8.01A2.75 2.75 0 0 1 2 11.162zM7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' : 'M4.623 3.43c-.659 0-1.192.534-1.192 1.193v6.115c0 .316.125.62.349.843l7.64 7.64c.465.465 1.22.465 1.685 0l6.115-6.116a1.19 1.19 0 0 0 0-1.686l-7.64-7.64a1.2 1.2 0 0 0-.842-.348zM2 4.624A2.623 2.623 0 0 1 4.623 2h6.115a2.62 2.62 0 0 1 1.854.768l7.64 7.64a2.623 2.623 0 0 1 0 3.709l-6.115 6.115a2.623 2.623 0 0 1-3.71 0l-7.639-7.64A2.62 2.62 0 0 1 2 10.738zm3.815 2.623a1.43 1.43 0 1 1 2.861 0 1.43 1.43 0 0 1-2.861 0'}/>
          </svg>
          <p className="text-xl">Bán</p>
        </div>
        <div onClick={() => {setIsForRent(true); setIsForSale(false)}} className={`p-4 cursor-pointer border-1 border-black shadow-md hover:bg-gray-200 rounded-3xl w-full`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill="#000" fillRule="evenodd" d={isForRent ? 'M8.398 9.24c0-3.78 3.06-6.84 6.84-6.84s6.84 3.06 6.84 6.84-3.06 6.84-6.84 6.84c-.48 0-1.02-.06-1.5-.18l-1.92 1.92a.77.77 0 0 1-.6.24h-1.14v1.14c0 .48-.36.84-.84.84h-1.14v1.14c0 .48-.36.84-.84.84h-3a1.87 1.87 0 0 1-1.86-1.86v-2.58c0-.48.18-.96.54-1.32l5.64-5.64c-.12-.36-.18-.84-.18-1.38m6-1.98c0-.48.36-.84.84-.84a2.88 2.88 0 0 1 2.88 2.88c0 .48-.36.84-.84.84a.82.82 0 0 1-.84-.84c0-.66-.54-1.14-1.14-1.14-.54-.06-.9-.42-.9-.9' : 'M14.998 3.85a5.15 5.15 0 0 0-4.929 6.646c.09.3.01.626-.212.848l-5.965 5.964a.15.15 0 0 0-.044.106V20c0 .083.068.15.15.15h2.15V19c0-.47.381-.85.85-.85h1.15V17c0-.47.381-.85.85-.85h1.648l2.008-2.008a.85.85 0 0 1 .848-.212 5.15 5.15 0 1 0 1.496-10.08M8.148 9a6.85 6.85 0 1 1 5.364 6.688L11.6 17.601a.85.85 0 0 1-.602.249h-1.15V19c0 .47-.38.85-.85.85h-1.15V21c0 .47-.38.85-.85.85h-3A1.85 1.85 0 0 1 2.148 20v-2.586c0-.49.195-.961.542-1.308l5.62-5.62A7 7 0 0 1 8.148 9m6-2c0-.47.381-.85.85-.85A2.85 2.85 0 0 1 17.848 9a.85.85 0 1 1-1.7 0 1.15 1.15 0 0 0-1.15-1.15.85.85 0 0 1-.85-.85'}/>
          </svg>
          <p className="text-xl">Cho thuê</p>
        </div>
      </div>
    </div>
  )
}


export default Sale_or_rent