'use client'

import { useEffect, useState } from "react"
import ImageUploader from "./imgUploader"
import { Discribe } from "../dang_san_pham_container"

interface Discribe_component_props {
  setData: (val: Discribe) => void
}



const Discribe_component = ({setData}: Discribe_component_props) => {
  const [title, setTitle] = useState<string>('')
  const [isValidTitle, setIsValidTitle] = useState<boolean>(true)
  const [discribe, setDiscribe] = useState<string>('')
  const [isValidDiscribe, setIsValidDiscribe] = useState<boolean>(true)
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState<string>()

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <p className="text-2xl font-bold mb-2">Tiêu Đề</p>
        <input onBlur={(e) => {  if (e.target.value.length < 30 || e.target.value.length > 99) {setIsValidTitle(false)} else {setIsValidTitle(true)}}} onChange={(e) => setTitle(e.target.value)} className={`rounded-sm outline-0 px-4 py-2 bg-gray-100 border-1 ${isValidTitle ? 'border-gray-400 hover:border-gray-500' : 'border-red-400 bg-red-100 focus:border-red-700'} focus:border-gray-700 shadow-lg w-full`} placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ (VD: Bán nhà riêng chính chủ 50m² tại Thủ Đức)"></input>
        <p className={`${isValidTitle ? 'text-gray-700' : 'text-red-700'}`}>30 &le; {title.length} &le; 99</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold mb-2">Mô tả</p>
        <textarea onBlur={(e) => {if (e.target.value.length < 30) {setIsValidDiscribe(false)} else {setIsValidDiscribe(true)}}} onChange={(e) => setDiscribe(e.target.value)} className={`rounded-sm outline-0 p-4 bg-gray-100 border-1 h-100 ${isValidDiscribe ? 'border-gray-400 hover:border-gray-500' : 'border-red-400 bg-red-100 focus:border-red-700'} focus:border-gray-700 shadow-lg w-full`} placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ (VD: Bán nhà riêng chính chủ 50m² tại Thủ Đức)"></textarea>
        <p className={`${isValidDiscribe ? 'text-gray-700' : 'text-red-700'}`}>30 &le; {discribe.length}</p>
      </div>
      <ImageUploader onImagesSelected={setImages}/>
      <div> 
        <p className="text-2xl font-bold mb-2">Video</p>
        <input onChange={(e) => setVideo(e.target.value)} className="outline-0 shadow-lg w-full border-1 border-gray-400 hover:border-gray-600 hover:bg-gray-100 px-4 py-2 rounded-sm" placeholder="Dán link Youtube hoặc Tiktok (không bắt buộc)" type="text" />
      </div>
        <button   
          disabled={!(
            (title.length >= 30 && title.length <= 99) &&
            (discribe.length >= 30) &&
            (images.length >= 3)
          )} 
          onClick={() => setData({title: title, discribe: discribe, images: images, video: video})} className="p-1 btn  w-full ml-auto bg-red-600">
          Xong
        </button>
    </div>
  )
}


export default Discribe_component