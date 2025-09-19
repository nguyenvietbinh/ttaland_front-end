'use client'

import { useEffect, useState,useRef } from "react"
import { MediaItem } from "./media_displayer"
import Video_modal_tab from "./modal_tab/video_modal_tab"
import Image_modal_tab from "./modal_tab/image_modal_tab"
import Map_modal_tab from "./modal_tab/map_modal_tab"


interface Media_modal_props {
  mediaItems: MediaItem[]
  currentMedia: MediaItem
}

const Media_modal = ({mediaItems, currentMedia}: Media_modal_props) => {
  const media_modalRef = useRef<HTMLDialogElement>(null);
  const [currentTab, setCurrentTab] = useState<'video' | 'image' | 'map'>()
  const videoMediaItems = mediaItems.filter(item => item.type !== 'image')
  const imageMediaItems = mediaItems.filter(item => item.type === 'image')
  const startImageIndex: number = imageMediaItems.indexOf(currentMedia) === -1 ? 0 : imageMediaItems.indexOf(currentMedia)
  const startVideoIndex: number = videoMediaItems.indexOf(currentMedia) === -1 ? 0 : videoMediaItems.indexOf(currentMedia)




  useEffect(() => {
    setCurrentTab(() => (currentMedia.type === 'image' ? 'image' : 'video'))
  }, [currentMedia])



  return (
    <dialog id="media_modal" ref={media_modalRef} className="modal">
      <div className="modal-box bg-black text-white w-screen h-screen p-0 md:pr-4 rounded-none max-w-screen">
        <div className="flex items-center gap-1 justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 cursor-pointer ${currentTab === 'video' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('video')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>            
            <p className="text-base/6">Video</p>
          </div>

          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 cursor-pointer ${currentTab === 'image' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('image')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <p className="text-base/6">Hình ảnh</p>
          </div>

          <div
            className={`flex transition-all duration-300 items-center gap-1 rounded-full border-[2px] px-2 cursor-pointer ${currentTab === 'map' ? 'bg-white text-black border-white' : 'border-gray-500 hover:border-white'}`} 
            onClick={() => setCurrentTab('map')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
            </svg>            
            <p className="text-base/6">Bản đồ</p>
          </div>
        </div>

        {currentTab === 'video' && videoMediaItems.length ? (
          <Video_modal_tab mediaItems={videoMediaItems} startVideoIndex={startVideoIndex}/>
        ) : currentTab === 'image' && imageMediaItems.length ? (
          <Image_modal_tab mediaItems={imageMediaItems} startImageIndex={startImageIndex}/>
        ) : currentTab === 'map' ? (
          <Map_modal_tab/>
        ): null}




        {/* close button */}
        <div className="modal-action mt-0">
          <form method="dialog">
                <button className="text-white border-2 hidden md:block border-gray-400 hover:border-white transition-all duration-300 p-1 cursor-pointer rounded-full m-3 absolute top-0 left-0"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}


export default Media_modal