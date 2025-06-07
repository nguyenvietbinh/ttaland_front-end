'use client'

import { useEffect } from 'react'

type search_bar_props = {
  modal_name: string
}

const Search_bar = ({ modal_name = '' }: search_bar_props) => {
  const keywords = [1, 2, 3, 4, 5, 6, 7]
  // Lắng nghe tổ hợp phím Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        const modal = document.getElementById(modal_name) as HTMLDialogElement
        modal?.showModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modal_name])

  return (
    <div className="flex">
      <div
        className='xl:flex mx-4 bg-gray-500 p-1 h-7 rounded-full hidden my-auto inset-shadow-md cursor-pointer items-center'
        onClick={() => (document.getElementById(modal_name) as HTMLDialogElement)?.showModal()}
      >
        <span className='mx-4 text-sm text-white'>Ctrl K</span>
        <img src="/img/search.png" alt="" className='h-full'/>
      </div>
      
      <img
        src="/img/search.png"
        alt=""
        className="h-8 my-auto mx-4 flex xl:hidden cursor-pointer"
        onClick={() => (document.getElementById(modal_name) as HTMLDialogElement)?.showModal()}
      />
      
      <dialog id={modal_name} className="modal">
        <div className="modal-box w-11/12 bg-gray-900 max-w-5xl">
          <label className="input w-full focus-within:outline-none bg-gray-800 text-xl">
            <img src="/img/search.png" className='h-6' alt="" />
            <input type="search" required placeholder='Search' className=''/>
          </label>
          <div className='w-full mt-2 border-solid border-gray-400 rounded-xl p-1'>
            <ul className="space-y-2">
              {keywords.map((key_word) => (
                <div key={key_word} className='flex justify-between cursor-pointer shadow-2xs shadow-gray-800 hover:bg-gray-700 items-center py-1 px-2 rounded-sm'>
                  <li className=''>key word {key_word}</li>
                  <img src="/img/x.png" className='h-4' alt="" />
                </div>
              ))}
            </ul>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Search_bar
