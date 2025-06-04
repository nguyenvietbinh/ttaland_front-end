'use client'


const Search_bar = () => {

  return (
    <div>
      <div className='xl:flex mx-4 bg-gray-500 p-1 h-7 rounded-full hidden inset-shadow-md cursor-pointer items-center' onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}><span className='mx-4 text-sm text-white'>Ctrl K</span><img src="/img/search.png" alt="" className='h-full'/></div>
      <img src="/img/search.png" alt="" className="h-7 mx-4 flex xl:hidden" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}/>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <label className="input w-full focus-within:outline-none text-xl">
              <img src="/img/search.png" className='h-6' alt="" />
              <input type="search" required placeholder="Search" className=''/>
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