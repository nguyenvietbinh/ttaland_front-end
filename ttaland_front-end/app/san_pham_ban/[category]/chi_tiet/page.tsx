'use client'
import NavBar from "@/components/nav_bar/navbar"
import Media_displayer from "@/components/detail_page/detail_page_components/media_displayer"
import Footer from "@/components/layout/footer"
import { useSearchParams } from "next/navigation"

const San_pham_ban_project_detail_page = () => {
  const searchParams = useSearchParams()

  const listOfImg = searchParams.get('id')?.split('')
  const getDataFromId= () => {
    const data = []
    if (listOfImg?.length) {
      for (let i = 0; i < listOfImg.length; i ++) {
        data.push({
          type: 'image' as const,
          url: `/img/example/showcase${listOfImg[i]}.jpg`
        })
      }
      return data
    }
    return [{
      type: 'image' as const,
      url: '/img/example/show.jpg'
    }]
    
  }
  const data = getDataFromId()

  return (
    <div className="bg-gray-300 w-full min-h-screen text-black h-auto">
      <NavBar/>
      <div className="container mx-auto h-auto">
        {(listOfImg?.length) ? (
          <div>
            <div className="flex h-auto">
              <Media_displayer mediaItems={data}/>
              <div className="w-2/5 pt-6 ">
                <div className="w-full h-full p-2 text-3xl">
                  Thông tin cơ bản
                </div>
              </div>
            </div>
            <div className="w-full h-150 p-2"><h1 className="text-5xl">Thông tin chi tiết</h1></div>
            <div className="w-full h-150 "><h1 className="text-5xl">Sản Phẩm Tương Tự</h1></div>
          </div>
        ) : (
          <div>
            Không Tìm Thấy Sản Phẩm
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default San_pham_ban_project_detail_page