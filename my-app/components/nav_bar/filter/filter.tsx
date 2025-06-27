'use client'

import { useEffect } from 'react'
import Filter_form from './filter_form/filter_form'


type filter_props = {
  modal_name: string
}

const Filter = ({ modal_name = '' }: filter_props) => {
  const keywords = []
  const getRandomAlphabetCharacter = (): string => {
    const randomNum = Math.floor(Math.random() * 26);
    const charCode = randomNum + 97;
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
      <div className="h-8 my-auto mx-4 flex cursor-pointer items-center">
      <img
        src="/img/icons/filter.png"
        alt=""
        className='w-full h-full'
        onClick={() => (document.getElementById(modal_name) as HTMLDialogElement)?.showModal()}
      />
      </div>

      
      <dialog id={modal_name} className="modal">
        <div className="modal-box bg-gray-950 p-4 max-w-2xl max-h-5xl h-[70%]">
          <Filter_form/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Filter
