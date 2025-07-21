'use client'
import Media_displayer from "./detail_page_components/media_displayer";

interface San_pham_ban_project_detail_props {
  id: string | null;
}


const San_pham_ban_project_detail = ({ id }: San_pham_ban_project_detail_props) => {

  const listOfImg = id?.split('')
  const getDataFromId= () => {
    const data: [{
      type: 'image' | 'video',
      url: string,
      poster?: string;
      format?: string;
    }] = [{
      type: 'video' as const,
      url: '/img/example/showcasevid.mp4',
      format: 'mp4',
    }]
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
      <div className="container mx-auto h-auto p-2">
        {(listOfImg?.length) ? (
          <div>
            <div className="lg:flex h-auto">
              <Media_displayer id={id} mediaItems={data}/>
              <div className="lg:w-2/5 w-full pt-6 ">
                <div className="w-full h-full p-2 text-3xl ring-2 ring-red-500">
                  Thông tin chi tiết
                </div>
              </div>
            </div>
            <div className="w-full h-150 "><h1 className="text-5xl">Sản Phẩm Tương Tự</h1></div>
          </div>
        ) : (
          <div>
            Không Tìm Thấy Sản Phẩm
          </div>
        )}
      </div>
  )
}


export default San_pham_ban_project_detail