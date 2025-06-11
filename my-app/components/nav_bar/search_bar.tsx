'use client'

import { useEffect } from 'react'

type search_bar_props = {
  modal_name: string
}

const Search_bar = ({ modal_name = '' }: search_bar_props) => {
  const keywords = []
  const getRandomAlphabetCharacter = (): string => {
    // Generate a random number between 0 and 25
    const randomNum = Math.floor(Math.random() * 26);
    // Convert to ASCII code for lowercase letters (97-122)
    const charCode = randomNum + 97;
    // Convert ASCII code to character
    return String.fromCharCode(charCode);
  };
  const getRandomKeyword = (): string => {
    const randomNum = Math.floor(Math.random() * 26);
    let ans = ''
    for (let i = 0; i < randomNum; i ++) {
      ans += getRandomAlphabetCharacter()
    }
    return ans
  }
  const randomNum = Math.floor(Math.random() * 26);
  for (let i = 0; i < 30; i ++) {
    keywords.push(getRandomKeyword())
  }


  // listen to ctrl+k
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
      <div className="h-8 my-auto mx-4 flex cursor-pointer items-center tooltip tooltip-bottom" data-tip="Tìm Kiếm">
      <img
        src="/img/filter.png"
        alt=""
        className='w-full h-full'
        onClick={() => (document.getElementById(modal_name) as HTMLDialogElement)?.showModal()}
      />
      </div>

      
      <dialog id={modal_name} className="modal">
        <div className="modal-box w-11/12 bg-gray-900 max-w-5xl">
          <label className="input w-full focus-within:outline-none bg-gray-800 text-xl">
            <img src="/img/search.png" className='h-6' alt="" />
            <input type="search" required placeholder='Tỉnh, Thành Phố/Quận Huyện' className=''/>
          </label>

        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Search_bar
