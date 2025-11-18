'use client'
import { newsData } from "@/network/news/GET_news"
import { useEffect, useState } from "react";
import Link from "next/link";
import { getNews } from "@/network/news/GET_news"
import Detail_sidebar from "../sidebar/detail_sidebar";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

interface News_detail_props {
  id: string
}

const News_detail = ({ id }: News_detail_props) => {
  const [data, setData] = useState<newsData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const result = await getNews.getNewsWithID(id);
        setData(result);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-2 flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Đang tải tin tức...</div>
      </div>
    );
  }

  return (
    <div>
      {data ? (
        <div className="main_container flex-col">
          <h1 className="text-5xl mt-12">{data.title}</h1>
          <img className="object-cover aspect-video w-full" src={data.thumb} alt="" />
          <div className="flex">
            <div className="content_container flex flex-col gap-4">
              <p className="text-gray-600">Ngày đăng: {formatDate(data.created_at)}</p>
              <p className="font-semibold text-2xl/10">{data.discription}</p>
              {data.contents.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  {item.type === 'title' && (
                    <h1 className="text-4xl font-bold mt-6">{item.content}</h1>
                  )}
                  {item.type === 'text' && (
                    <p className="text-xl/8">{item.content}</p>
                  )}
                  {item.type === 'image' && (
                    <div>
                      <img src={item.content} alt="" />
                      <p className="text-gray-600 text-sm">{item.imageTitle}</p>
                    </div>
                  )}
                </div>
              ))}
              <p>———</p>
              <span><span className="font-bold">nguồn:</span> <Link href={data.src}>{data.src}</Link></span>
              <p>———</p>
              <span className=""><span className="font-bold">Tuyên bố miễn trừ trách nhiệm:</span> Thông tin được cung cấp chỉ mang tính chất thông tin chung, chúng tôi không đưa ra bất kỳ tuyên bố hoặc bảo đảm nào liên quan đến thông tin, bao gồm nhưng không giới hạn bất kỳ sự tuyên bố hoặc bảo đảm về tính thích hợp cho bất kỳ mục đích cụ thể nào của thông tin theo phạm vi cho phép tối đa của pháp luật. Mặc dù đã nỗ lực để đảm bảo rằng thông tin được cung cấp trong bài viết này là chính xác, đáng tin cậy và hoàn chỉnh vào thời điểm đăng tải, nhưng thông tin được cung cấp trong bài viết này không nên được dựa vào để đưa ra bất kỳ quyết định tài chính, đầu tư, bất động sản hoặc pháp lý nào. Thêm vào đó, thông tin không thể thay thế lời khuyên từ một chuyên gia được đào tạo, người mà có thể xem xét, đánh giá các sự kiện và hoàn cảnh cá nhân của bạn, và chúng tôi không chịu bất kỳ trách nhiệm nào nếu bạn sử dụng những thông tin này để đưa ra quyết định.</span>
            </div>
            <Detail_sidebar/>
          </div>
        </div>
      ) : (
        <div>
          Không tìm thấy tin !!!
        </div>
      )}
    </div>
  )
}

export default News_detail