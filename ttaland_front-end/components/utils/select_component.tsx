'use client'

import { useState, useEffect, useRef } from "react"

interface Select_component_props {
  options: string[],
  setData: (val: string) => void
  default_value?: string
  open?: boolean
}


const Select_component = ({options, default_value, setData, open=false}: Select_component_props) => {
  const [val, setVal] = useState<string>(default_value ? default_value : options[0])
  const [isOpen, setIsOpen] = useState<boolean>(open)
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      // Đóng dropdown khi click ra ngoài
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current && 
          !inputRef.current.contains(event.target as Node) &&
          suggestionsRef.current && 
          !suggestionsRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      setData(val)
    }, [val])
  


  return (
    <div className="w-full">
      <div ref={inputRef} onClick={() => setIsOpen(val => !val)} className={`w-full py-2 px-4 shadow-lg cursor-pointer hover:bg-gray-100 border-1 transition-all duration-200 ${isOpen ? 'border-gray-500' : 'border-gray-400'} items-center rounded-3xl flex flex-col justify-between`}>
        <div className="flex items-center justify-between w-full px-4">
          <p className="text-xl">{val}</p>
          <svg className={`${isOpen ? '-rotate-90' : 'rotate-90'} transition-all duration-300`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      {isOpen && options.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="z-10 w-full mt-2 text-black max-h-50 overflow-auto border-t-1 border-gray-300"
        >
          <ul className="w-full gap-2 p-2 text-lg">
            {options.map((option,) => (
              <li key={option} className={`${option === val ? 'bg-gray-200 rounded-sm' : ''}`} onClick={() => setVal(option)}>
                <div className="p-2 rounded-sm cursor-pointer hover:bg-gray-300">
                  {option}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}


export default Select_component