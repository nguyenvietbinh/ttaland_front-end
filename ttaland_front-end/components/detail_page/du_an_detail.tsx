'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link';

interface ProjectDetailProps {
  projectId?: string;
  category?: string;
  backPath?: string;
}

const Du_an_detail = ({ projectId, category, backPath }: ProjectDetailProps) => { 
    // Mock data based on The Larita project structure
    const projectData = {
      id: projectId || '1',
      name: `THE LARITA ${projectId || 'PREMIUM'}`,
      subtitle: "NHÀ PHỐ CAO CẤP LONG AN",
      price: "4.100.000.000 VND",
      oldPrice: "4.500.000.000 VND",
      discount: "10%",
      location: "Đường Hoàng Phan Thái, Mỹ Yên, Bến Lức, Long An",
      developer: "Công ty cổ phần Bất động sản Xuân Thảo",
      contractor: "Chương Dương Corp",
      management: "Anabuki Nhật Bản",
      distributor: "Phúc Điền Quân",
      totalArea: "3.75 ha",
      totalUnits: "199 căn",
      unitTypes: "116 căn E-House, 83 căn T-House",
      areas: "5x16m, 5x17m, 5x18m, 5x19m",
      handover: "Quý IV/2025",
      legalStatus: "Sổ hồng riêng",
      completionLevel: "Hoàn thiện bên ngoài, thô bên trong",
      bedrooms: Number(projectId) || 3,
      bathroom: 2,
      garage: 2,
      sqft: "80-95m²",
      owner: "Nguyen Van A",
      timePosted: "1 năm",
      description: `The Larita tọa lạc tại vị trí đắc địa Mỹ Yên – Bến Lức, cửa ngõ kết nối giao thông huyết mạch TP.HCM với các tỉnh miền Tây và dự án sân bay Long Thành tương lai. Dự án đầu tay đầy tâm huyết của Xuân Thảo Group với thiết kế hiện đại, không gian sống xanh trong lành cùng hàng loạt tiện ích nội khu đẳng cấp.`,
      overallPlan: "The Larita sở hữu mặt bằng tổng thể khép kín, nhiều tiện ích đẳng cấp bên trong. Toàn bộ quy hoạch được bố trí khoa học với phân chia rõ ràng các khu vực: nhà phố vườn, khu biệt thự song lập tinh tế, khu tiện ích trung tâm tập trung đầy đủ dịch vụ như trường học, siêu thị, nhà hàng, hồ bơi, câu lạc bộ. Giữa các khu vực là hệ thống đường nội khu rộng thoáng đảm bảo giao thông lưu thông thuận tiện.\n Không gian xanh xen kẽ khắp dự án, hứa hẹn mang đến môi trường sống trong lành, năng động. Với quy hoạch bài bản, cư dân The Larita được tận hưởng cuộc sống đẳng cấp, đầy đủ tiện nghi ngay trong khuôn viên nhà mình.",
      images: [
        '/img/showcase.png', 
        '/img/larita/lien-ket-vung-du-an-the-larita.jpg', 
        '/img/larita/vi-tri-du-an-the-larita.jpg', 
        '/img/larita/mat-bang-tong-the-du-an-the-larita.jpg',
        '/img/larita/e-house-the-larita.jpg',
        '/img/larita/t-house-the-larita.jpg',
        '/img/larita/phoi-canh-the-larita.jpg',
        '/img/larita/layout-e-house-the-larita.jpg',
        '/img/larita/layout-t-house-the-larita.jpg'
      ],
      amenities: [
        "Trường mầm non quốc tế",
        "Khu thương mại dịch vụ",
        "Clubhouse với hồ bơi",
        "Phòng gym hiện đại",
        "Khu vui chơi trẻ em",
        "Khu BBQ ngoài trời",
        "Hệ thống vườn cây xanh"
      ],
      specialOffers: [
        "Chiết khấu 1% cho khách hàng booking sớm",
        "Chiết khấu mua sỉ: 2-3 căn 1%; 4 căn trở lên 2%",
        "Chiết khấu 10% cho khách hàng thanh toán sớm",
        "Tặng 12 tháng phí quản lý cho căn T-house",
        "Tặng 60 tháng phí quản lý cho căn E-house",
        "Miễn phí 1 năm học phí tại trường mầm non Quốc tế",
        "Ngân hàng hỗ trợ vay đến 70%"
      ]
    };

    return (
        <div className="w-full bg-gray-900 text-white">
            {/* Back button */}
            {backPath && (
                <div className="w-full xl:w-[1280px] 2xl:w-[1536px] mx-auto px-4 xl:px-0 pt-4">
                    <Link href={backPath} className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back to Dự án {category && `/ ${category}`}
                    </Link>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 py-16"
                 style={{
                     backgroundImage: `url('${projectData.images[6]}')`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                 }}>
                <div className="w-full xl:w-[1280px] 2xl:w-[1536px] mx-auto px-4 xl:px-0">
                    <div className="text-center">
                        <p className="text-xl mb-2">{projectData.subtitle}</p>
                        <h1 className="text-5xl font-bold mb-4">{projectData.name}</h1>
                        
                        {/* Hero Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                                <div className="text-m text-blue-600 font-bold">MỞ BÁN</div>
                                <div className="text-3xl text-blue-600 font-bold">50 CĂN</div>
                                <div className="text-m text-blue-600 font-bold">ĐẦU TIÊN</div>
                            </div>
                            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                                <div className="text-m text-blue-600 font-bold">CHIẾT KHẤU</div>
                                <div className="text-3xl text-blue-600 font-bold">{projectData.discount}</div>
                                <div className="text-m text-blue-600 font-bold">THANH TOÁN</div>
                            </div>
                            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                                <div className="text-m text-blue-600 font-bold">MIỄN PHÍ</div>
                                <div className="text-3xl text-blue-600 font-bold">5 NĂM</div>
                                <div className="text-m text-blue-600 font-bold">PHÍ QUẢN LÝ</div>
                            </div>
                            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                                <div className="text-m text-blue-600 font-bold">BÀN GIAO</div>
                                <div className="text-3xl text-blue-600 font-bold">Q4/2025</div>
                                <div className="text-m text-blue-600 font-bold">HOÀN THIỆN</div>
                            </div>
                        </div>
                        
                        <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-xl font-semibold transition-colors">
                            NHẬN BẢNG GIÁ MỚI NHẤT QUA ZALO
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full xl:w-[1280px] 2xl:w-[1536px] mx-auto px-4 xl:px-0">
                {/* Project Overview */}
                <section className="py-12">
                    <h2 className="text-4xl font-bold text-center mb-8">GIỚI THIỆU THÔNG TIN TỔNG QUAN</h2>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="text-center bg-gray-600 p-6 rounded-lg">
                            <div className="text-blue-400 text-base mb-2">QUY MÔ</div>
                            <div className="text-3xl font-bold">{projectData.totalArea}</div>
                        </div>
                        <div className="text-center bg-gray-600 p-6 rounded-lg">
                            <div className="text-blue-400 text-base mb-2">SỐ LƯỢNG</div>
                            <div className="text-3xl font-bold">{projectData.totalUnits}</div>
                        </div>
                        <div className="text-center bg-gray-600 p-6 rounded-lg">
                            <div className="text-blue-400 text-base mb-2">VẬN HÀNH</div>
                            <div className="text-xl font-bold">ANABUKI</div>
                        </div>
                        <div className="text-center bg-gray-600 p-6 rounded-lg">
                            <div className="text-blue-400 text-base mb-2">BÀN GIAO</div>
                            <div className="text-xl font-bold">{projectData.handover}</div>
                        </div>
                    </div>

                    {/* Project Info Table */}
                    <div className="bg-gray-600 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Tên dự án:</span>
                                    <span className="font-semibold">{projectData.name}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Vị trí:</span>
                                    <span className="font-semibold text-right">{projectData.location}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Chủ đầu tư:</span>
                                    <span className="font-semibold text-right">{projectData.developer}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Tổng thầu:</span>
                                    <span className="font-semibold">{projectData.contractor}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Quy mô:</span>
                                    <span className="font-semibold">{projectData.totalArea}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Số lượng:</span>
                                    <span className="font-semibold">{projectData.unitTypes}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Diện tích:</span>
                                    <span className="font-semibold">{projectData.areas}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Bàn giao:</span>
                                    <span className="font-semibold">{projectData.handover}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">Pháp lý:</span>
                                    <span className="font-semibold">{projectData.legalStatus}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="text-gray-300">ĐV phân phối:</span>
                                    <span className="font-semibold">{projectData.distributor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="py-12">
                    <h2 className="text-4xl font-bold text-center mb-8">SẢN PHẨM ĐANG MỞ BÁN</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* T-House */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <img src={projectData.images[5]} alt="T-House" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-4">NHÀ PHỐ T-HOUSE</h3>
                                <ul className="space-y-2 mb-4">
                                    <li>• Diện tích: 5×17 – 5×19</li>
                                    <li>• Kết cấu: 1 trệt – 2 lầu</li>
                                    <li>• Giá bán: 4,1 – 5 tỷ</li>
                                </ul>
                                <div className="text-center bg-blue-900 p-3 rounded">
                                    <div className="text-base">MỖI ĐỢT THANH TOÁN CHỈ</div>
                                    <div className="text-2xl font-bold">100 triệu</div>
                                    <div className="text-base">TƯƠNG ĐƯƠNG 2,5%</div>
                                </div>
                            </div>
                        </div>

                        {/* E-House */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <img src={projectData.images[4]} alt="E-House" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-4">NHÀ PHỐ E-HOUSE</h3>
                                <ul className="space-y-2 mb-4">
                                    <li>• Diện tích: 5×17 – 5×19</li>
                                    <li>• Kết cấu: 1 trệt – 1 lửng – 2 lầu</li>
                                    <li>• Giá bán: 4,6 – 5,1 tỷ</li>
                                </ul>
                                <div className="text-center bg-blue-900 p-3 rounded">
                                    <div className="text-base">MỖI ĐỢT THANH TOÁN CHỈ</div>
                                    <div className="text-2xl font-bold">120 triệu</div>
                                    <div className="text-base">TƯƠNG ĐƯƠNG 2,5%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Special Offers */}
                <section className="py-12">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8">
                        <h2 className="text-3xl font-bold text-center mb-6">CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projectData.specialOffers.map((offer, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-white">• {offer}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                NHẬN BẢNG GIÁ MỚI NHẤT QUA ZALO
                            </button>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section className="py-12">
                    <h2 className="text-4xl font-bold text-center mb-8">VỊ TRÍ DỰ ÁN</h2>
                    <div className="bg-gray-600 rounded-lg p-6">
                        <img src={projectData.images[2]} alt="Vị trí dự án" className="w-3/4 h-3/4 object-cover rounded mb-6 mx-auto" />
                        <p className="text-gray-300 leading-relaxed mb-4 w-3/4 mx-auto text-justify">{projectData.description}</p>
                        <ul className="space-y-2 text-gray-300 w-3/4 mx-auto">
                            <li>• Cách chợ Bình Chánh – TP.HCM chỉ khoảng 2km</li>
                            <li>• Cách trung tâm Quận 1 – TP.HCM chỉ 35 phút di chuyển</li>
                            <li>• Liền kề tuyến cao tốc Bến Lức – Long Thành</li>
                            <li>• Kết nối trực tiếp với vành đai 3</li>
                        </ul>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-12">
                    <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">LIÊN HỆ TƯ VẤN</h2>
                        <p className="mb-6">Nhận ngay bảng giá và thông tin chi tiết dự án</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                Hotline: 0935 266 168
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                                Đăng ký xem nhà mẫu
                            </button>
                        </div>
                    </div>
                </section>

                {/* Overall Plan */}
                <section className="py-12">
                    <h2 className="text-4xl font-bold text-center mb-8">MẶT BẰNG TỔNG THỂ</h2>
                    <div className="bg-gray-600 rounded-lg p-6">
                        <div className="text-black bg-gray-200 px-6 pb-2 pt-4 rounded-lg leading-relaxed mb-4 w-3/4 mx-auto text-justify">
                            {projectData.overallPlan.split('\n').map((line, index) => (
                                <p key={index} className="mb-3">{line}</p>
                            ))}
                        </div>
                        <img src={projectData.images[3]} alt="Mặt bằng tổng thể" className="w-3/4 h-3/4 object-cover rounded mb-6 mx-auto" />

                    {/* Product Layout Section */}
                        <div className="text-gray-300 leading-relaxed mb-6 w-3/4 mx-auto">
                            <p className="mb-6 text-center">
                                Mặt bằng tổng thể The Larita được quy hoạch khép kín với phân khu nhà ở và khu tiện ích trung tâm hiện đại.
                            </p>

                                <div className="text-black bg-gray-200 rounded-lg p-6">
                                    <h3 className="text-2xl font-bold mb-4">Nằm rải rác là khu tiện ích quy mô lớn với đầy đủ tiện nghi:</h3>
                                    <ul className="list-disc pl-6 space-y-1 mb-6">
                                        <li>Trường mầm non chuẩn quốc tế</li>
                                        <li>Khu thương mại với siêu thị, nhà hàng, quán cà phê</li>
                                        <li>Clubhouse hiện đại gồm hồ bơi, phòng gym, khu vui chơi trẻ em</li>
                                    </ul>
                                    
                                    <p className="mb-4">
                                        Ngoài ra còn có khu vực BBQ ngoài trời, vườn cây xanh mát để nghỉ dưỡng. Hệ thống đường nội khu được bố trí rộng rãi, giao thông lưu thông thuận lợi.
                                    </p>
                                    
                                    <p>
                                        Mật độ xây dựng thấp chỉ 28% tạo không gian thoáng đãng, rộng tự cho từng căn nhà. Quy hoạch khép kín, tiện nghi đáp ứng đầy đủ nhu cầu an cư hiện đại của cư dân.
                                    </p>
                                </div>
                            
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold mb-4 text-center">Phân khu nhà ở bao gồm hai loại hình chính:</h3>
                            </div>
                        </div>
                        {/* Layout Images Section */}
                        <div className="w-3/4 mx-auto mt-8 bg-white rounded-lg p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* E-House Layout */}
                                <div>
                                                                       
                                    <div className="bg-white p-4 rounded-lg">
                                        <img 
                                            src={projectData.images[7]} 
                                            alt="Layout E-House" 
                                            className="w-full h-auto object-cover rounded mb-4"
                                        />
                                        <h4 className="text-xl font-semibold text-blue-400">T-house (Townhouse):</h4>
                                        <ul className="list-disc pl-6 space-y-1 text-black">
                                            <li>Diện tích: 5x16m, 5x17m, 5x18m, 5x19m</li>
                                            <li>Kết cấu: 1 trệt – 2 lầu</li>
                                        </ul>
                                    </div> 
                                </div>
                                
                                {/* T-House Layout */}
                                <div>   
                                                                     
                                    <div className="bg-white p-4 rounded-lg">
                                        <img 
                                            src={projectData.images[8]} 
                                            alt="Layout T-House" 
                                            className="w-full h-auto object-cover rounded mb-4"
                                        />
                                        <h4 className="text-xl font-semibold text-blue-400">E-house (Eco-house):</h4>
                                        <ul className="list-disc pl-6 space-y-1 text-black">
                                            <li>Diện tích: 5x16m, 5x17m, 5x18m, 5x19m</li>
                                            <li>Kết cấu: 1 trệt – 1 lửng – 2 lầu</li>
                                            <li>Tầng trệt có thể kinh doanh</li>
                                            <li>Thiết kế hiện đại, thân thiện môi trường</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Amenities */}
                <section className="py-12">
                    <h2 className="text-4xl font-bold text-center mb-8">TIỆN ÍCH TẠI DỰ ÁN</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectData.amenities.map((amenity, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                                <div className="text-blue-400 mb-2">
                                    <FontAwesomeIcon icon={faBuilding} className="text-3xl" />
                                </div>
                                <p className="font-semibold">{amenity}</p>
                            </div>
                        ))}
                    </div>
                </section>

                
            </div>
        </div>
    )
}

export default Du_an_detail;