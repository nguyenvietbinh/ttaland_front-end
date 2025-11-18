'use client'
import New_card from "./new_card"
import { getNews } from "@/network/news/GET_news"
import { useEffect, useState } from "react"
import { newsData } from "@/network/news/GET_news"
import { formatDate } from "./news_detail"
import Link from "next/link"

const News_listing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<newsData[]>()

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        const result = await getNews.getAllNews();
        console.log(result)
        setData(result);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, []);


  if (isLoading) {
    return (
      <div className="container mx-auto p-2 flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Đang tải tin tức...</div>
      </div>
    );
  }

  return (
    <div className=" bg-white">
      {data ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              {index == 0 ? (
                <div 
                  className="w-full aspect-video bg-cover bg-center bg-no-repeat cursor-pointer"
                  style={{ backgroundImage: `url(${item.thumb})` }}
                >
                  <Link href={`/tin_tuc/${item.id}`} className="h-full w-full bg-gradient-to-t from-black via-black/20  to-transparent py-4 px-6 flex flex-col justify-end">
                    <p className="text-sm text-gray-400">{formatDate(item.created_at)}</p> 
                    <p className="text-3xl line-clamp-2 text-white">{item.title}</p>
                    <p className="text-base text-gray-400 line-clamp-3">{item.discription}</p>
                  </Link>
                </div>
              ) : (
                <New_card data={item} key={index}/>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          Không tìm thấy tin tức!!!
        </div>
      )}
    </div>
  )
}

export default News_listing