'use client'
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { usePathname } from "next/navigation"
import News_detail from "@/components/news/news_detail"
import { useEffect, useState, useRef } from "react"
import { postNewsData } from "@/network/news/POST_news"
import { postnews } from "@/network/news/POST_news"


const News_detail_page = () => {
  const paths = usePathname()?.split('/') || ''
  const [imgs, setImgs] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImgs(prev => [...prev, ...Array.from(files)]);
    }
  };

  // useEffect(() => {
  //   console.log(imgs)
  //   if (imgs.length >= 2) {
  //     console.log(createNews())
  //   }
  // }, [imgs])

  // const createNews = async () => {
  // const data: postNewsData = {
  //   title: 'Phát Đạt Đẩy Mạnh Thi Công La Pura, Tăng Tốc Hoàn Thiện Dự Án',
  //   src: 'https://tapchixaydung.vn/phat-dat-day-manh-thi-cong-la-pura-tang-toc-hoan-thien-du-an-2020122400003433.html',
  //   thumb: {
  //     name: imgs[0].name,
  //     type: imgs[0].type
  //   },
  //   images: [
  //     {
  //       name: imgs[0].name,
  //       type: imgs[0].type
  //     },
  //     {
  //       name: imgs[1].name,
  //       type: imgs[1].type
  //     },
  //     {
  //       name: imgs[2].name,
  //       type: imgs[2].type
  //     },
  //     {
  //       name: imgs[3].name,
  //       type: imgs[3].type
  //     },
  //   ],
  //   discription: 'Công ty Cổ phần Phát triển Bất động sản Phát Đạt (HOSE: PDR) đang đẩy mạnh thi công dự án La Pura với cường độ cao, nhằm đảm bảo tiến độ bàn giao đúng cam kết và chất lượng theo tiêu chuẩn quốc tế.',
  //   contents: [
  //     {
  //       type: 'text',
  //       content: 'Tại hiện trường, các block thuộc hai phân khu Zenia và Risa – những khu đã mở bán – đang được triển khai sôi động nhất, thể hiện quyết tâm của doanh nghiệp trong việc đưa La Pura trở thành biểu tượng không gian sống mới của khu vực đô thị phía Đông TP.HCM.'
  //     },
  //     {
  //       type: 'title',
  //       content: 'Thi Công Ở Cường Độ Cao, Khẳng Định Năng Lực Triển Khai Của Phát Đạt'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Tại công trường La Pura, hoạt động thi công đang diễn ra với tốc độ khẩn trương và bài bản. Hàng loạt hạng mục hạ tầng kỹ thuật, cảnh quan và các block nhà ở đang được đẩy nhanh tiến độ thi công đồng loạt.'
  //     },
  //     {
  //       type: 'image',
  //       content: imgs[0].name,
  //       imageTitle: 'Hình ảnh thực tế tại công trường La Pura'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Đại diện nhà thầu cho biết, cường độ làm việc được duy trì xuyên suốt, nhằm đáp ứng lộ trình hoàn thiện đúng kế hoạch và cam kết bàn giao với khách hàng.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Hai phân khu Zenia và Risa là tâm điểm trong giai đoạn hiện tại. Đây là những khu đã mở bán và được thị trường đón nhận tích cực, với tỷ lệ đặt chỗ cao ngay từ đợt giới thiệu đầu tiên.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Phát Đạt cho biết, các block thuộc Zenia và Risa đang được thi công với đội ngũ và nguồn lực lớn nhất trên toàn dự án, ưu tiên cao nhất về tiến độ, chất lượng và an toàn công trình.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Với sự giám sát chặt chẽ từ đội ngũ kỹ thuật và các đơn vị quản lý dự án chuyên nghiệp, La Pura đang được thi công theo mô hình quản trị dự án tiêu chuẩn quốc tế, bảo đảm tính đồng bộ, tính thẩm mỹ và độ bền vững của công trình.'
  //     },
  //     {
  //       type: 'image',
  //       content: imgs[1].name,
  //       imageTitle: '“Thành phố dưỡng lành” La Pura dần hình thành rõ nét trên mặt tiền Quốc lộ 13.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Từng hạng mục, từ kết cấu, vật liệu đến cảnh quan, đều được lựa chọn và kiểm soát nghiêm ngặt, thể hiện tinh thần “xây đúng – làm thật – bàn giao chuẩn” mà Phát Đạt đã cam kết.'
  //     },
  //     {
  //       type: 'title',
  //       content: 'Zenia Và Risa – Hai Phân Khu Thể Hiện Triết Lý Phát Triển Mới'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Trong khi Zenia được định vị là phân khu dành cho phong cách sống cân bằng, tinh tế, chú trọng không gian mở và yếu tố wellness (sức khỏe – tinh thần), thì Risa lại mang dấu ấn khác biệt: một khu đô thị thân thiện với trẻ em và gia đình đa thế hệ.'
  //     },
  //     {
  //       type: 'image',
  //       content: imgs[2].name,
  //       imageTitle: 'Phối cảnh Risa by La Pura – tòa tháp đầu tiên thiết kế dành cho trẻ em tại Việt Nam'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Với concept “Living with Play – sống cùng niềm vui”, Risa được thiết kế với mật độ cây xanh, tiện ích giáo dục và không gian vui chơi đa năng cao hơn mặt bằng chung của dự án, tạo nên môi trường sống an toàn, giàu cảm xúc và khuyến khích trẻ em phát triển tự nhiên trong môi trường xanh.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Đây là bước đi mới trong triết lý phát triển sản phẩm human-centric của Phát Đạt – lấy con người làm trung tâm, trong đó trẻ em và gia đình là những giá trị cốt lõi để hình thành cộng đồng sống nhân văn.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Theo đại diện Phát Đạt, La Pura không chỉ là một dự án nhà ở, mà là một “khu đô thị tái tạo năng lượng sống” – nơi cư dân được trải nghiệm sự kết hợp hài hòa giữa không gian thiên nhiên, tiện ích đô thị và kiến trúc hiện đại.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Sự xuất hiện của phân khu Risa với định hướng “thân thiện với trẻ em” chính là minh chứng cho tư duy phát triển dự án thế hệ mới mà Phát Đạt đang triển khai: Kiến tạo những không gian sống không chỉ để ở, mà còn để trưởng thành – để các thế hệ cùng lớn lên trong môi trường xanh, nhân văn và bền vững.'
  //     },
  //     {
  //       type: 'title',
  //       content: 'La Pura – Động Lực Phát Triển Cho Khu Đô Thị Phía Đông TP.HCM'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Nằm trong khu vực đang phát triển mạnh của phía Đông TP.HCM, La Pura được xem là một trong những dự án quy mô lớn và có sức ảnh hưởng nhất khu vực.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Dự án sở hữu vị trí chiến lược, kết nối trực tiếp với các trục giao thông trọng điểm như cao tốc TP.HCM – Long Thành – Dầu Giây, đường Vành đai 3 và tuyến Metro tương lai, giúp di chuyển nhanh chóng đến trung tâm thành phố và các vùng phụ cận.'
  //     },
  //     {
  //       type: 'image',
  //       content: imgs[3].name,
  //       imageTitle: 'Phối cảnh Trung tâm Thương mại tại La Pura'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Sự hiện diện của La Pura đang tạo nên cú hích lớn cho thị trường bất động sản khu Đông, thúc đẩy tốc độ đô thị hóa và hình thành cộng đồng dân cư mới hiện đại.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Giới chuyên môn nhận định, khi hoàn thành, La Pura sẽ trở thành điểm tựa phát triển cho cả khu vực, không chỉ về hạ tầng, mà còn về chất lượng sống và giá trị đầu tư.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Phát Đạt định hướng La Pura trở thành dự án đô thị xanh kiểu mẫu, góp phần định hình lại chuẩn sống mới – bền vững, tiện nghi, gắn kết cộng đồng.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Dự án là minh chứng rõ ràng cho năng lực phát triển đô thị quy mô lớn của Phát Đạt, từ khâu quy hoạch tổng thể, triển khai kỹ thuật đến quản trị vận hành.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Việc đẩy mạnh thi công La Pura với cường độ cao cho thấy Phát Đạt đang chuyển dịch từ giai đoạn tái cấu trúc sang tăng tốc thực thi, tập trung vào chất lượng sản phẩm và hiệu quả triển khai.'
  //     },
  //     {
  //       type: 'text',
  //       content: 'Doanh nghiệp xác định rõ: phát triển bền vững không chỉ là triết lý, mà là phương thức vận hành thực tế – nơi mỗi dự án phải được hoàn thiện đúng chuẩn, đúng cam kết và tạo ra giá trị dài hạn cho khách hàng, nhà đầu tư và cộng đồng.'
  //     },

  //   ]
  // }

  //     // {
  //     //   type: 'text',
  //     //   content: ''
  //     // },

  //     // {
  //     //   type: 'title',
  //     //   content: ''
  //     // },

  //     // {
  //     //   type: 'image',
  //     //   content: imgs[0].name,
  //     //   imageTitle: ''
  //     // },

  // const res = await postnews.uploadNews(data, imgs)
  // return res
  // }

  return (
    <div>
      <NavBar/>
            {/* <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />
         */}

      
      <News_detail id={paths[2]}/>
      <Footer/>
    </div>
  )
}

export default News_detail_page