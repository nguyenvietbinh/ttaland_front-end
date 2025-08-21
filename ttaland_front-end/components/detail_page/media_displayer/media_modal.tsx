'use client'

import { useEffect, useState } from "react"
import { MediaItem } from "./media_displayer"
import Video_modal_tab from "./modal_tab/video_modal_tab"
import Image_modal_tab from "./modal_tab/image_modal_tab"
import Map_modal_tab from "./modal_tab/map_modal_tab"


interface Media_modal_props {
  mediaItems: MediaItem[]
  startTab: 'video' | 'image' | 'map'
  currentIndex: number
}

const Media_modal = ({mediaItems, startTab, currentIndex}: Media_modal_props) => {
  const [currentTab, setCurrentTab] = useState<'video' | 'image' | 'map'>(startTab)
  const currentMedia = mediaItems[currentIndex]
  const videoMediaItems = mediaItems.filter(item => item.type === 'video' || item.type === 'youtube' || item.type === 'tiktok')
  const imageMediaItems = mediaItems.filter(item => item.type === 'image')
  const startImageIndex: number = imageMediaItems.indexOf(currentMedia) === -1 ? 0 : imageMediaItems.indexOf(currentMedia)




  useEffect(() => {
    setCurrentTab(startTab)
  }, [startTab])



  return (
    <dialog id="media_modal" className="modal">
      <div className="modal-box bg-black text-white w-screen h-screen p-0 pr-4 rounded-none max-w-screen">
        <div className="flex items-center gap-4 justify-center p-2 my-2">
          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 py-0.5 cursor-pointer ${currentTab === 'video' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('video')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>            
            Video
          </div>

          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 py-0.5 cursor-pointer ${currentTab === 'image' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('image')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            Hình ảnh
          </div>

          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 py-0.5 cursor-pointer ${currentTab === 'map' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('map')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
            </svg>            
            Bản đồ
          </div>
        </div>

        {currentTab === 'video' ? (
          <Video_modal_tab mediaItems={videoMediaItems}/>
        ) : currentTab === 'image' ? (
          <Image_modal_tab mediaItems={imageMediaItems} startImageIndex={startImageIndex}/>
        ) : currentTab === 'map' ? (
          <Map_modal_tab/>
        ): null}




        {/* close button */}
        <div className="modal-action mt-0">
          <form method="dialog">
              <button 
                className="w-12 h-12 absolute top-2 right-6 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}


export default Media_modal