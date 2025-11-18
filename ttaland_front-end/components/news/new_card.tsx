'use client'
import { newsData } from "@/network/news/GET_news"
import { formatDate } from "./news_detail"
import Link from "next/link"
interface New_card_props {
  data: newsData
}

const New_card = ({ data }: New_card_props) => {

  return (
    <Link href={`/tin_tuc/${data.id}`} className="flex w-full mt-4 cursor-pointer">
      <img className="w-1/3 rounded-lg max-h-35 object-cover" src={data.thumb} alt="" />
      <div className="w-2/3 pl-2">
      <p className="text-sm text-gray-900">{formatDate(data.created_at)}</p>
        <p className="text-2xl line-clamp-2 hover:underline">{data.title}</p>
        <p className="text-base text-gray-800 line-clamp-3 hover:underline">{data.discription}</p>
      </div>
    </Link>
  )
}

export default New_card