
'use client'
import { usePathname } from 'next/navigation';
import Du_an_property from './show_property/du_an_show_property';
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import { useTownhouses } from '@/hooks/useTownhouses';

const Listing = () => {
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho', 'tat_ca']
  const list_path: string[] = path_name.split('/')

  // Use the hook for townhouse data when in nha_pho category
  const { townhouses, loading, error, loadMore, hasMore } = useTownhouses()
  
  // Fallback items for other categories (will be replaced later)
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  
  // Check if we're in the townhouse (nha_pho) section for sale
  const isTownhouseForSale = list_path[1] === 'san_pham_ban' && list_path[2] === 'nha_pho'

  return (
    <div>
      <div className="">
        <div className={category.includes(list_path[2]) ? "px-2 xl:mx-0 grid grid-cols-1  lg:grid-cols-2 gap-8" : "hidden"}>
          
          {/* Show loading state */}
          {isTownhouseForSale && loading && (
            <div className="col-span-2 text-center py-8 text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-2">Đang tải dữ liệu...</p>
            </div>
          )}

          {/* Show error state */}
          {isTownhouseForSale && error && (
            <div className="col-span-2 text-center py-8 text-red-400">
              <p>Có lỗi xảy ra: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Render townhouse data for nha_pho category */}
          {isTownhouseForSale && !loading && !error && townhouses.map((townhouse, index) => (
            <div key={townhouse.id}>
              <San_pham_ban_property townhouse={townhouse} />
            </div>
          ))}

          {/* Render mock data for other categories */}  
          {!isTownhouseForSale && items.map((item, index) => (
            <div key={index}>
              {(list_path[1] === 'san_pham_ban') ? (<San_pham_ban_property />) : (list_path[1] === 'san_pham_cho_thue') ? (<San_pham_cho_thue_property/>) : (<Du_an_property/>)}
            </div>
          ))}

          {/* Load more button for townhouses */}
          {isTownhouseForSale && !loading && hasMore && (
            <div className="col-span-2 text-center py-4">
              <button 
                onClick={loadMore}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tải thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default Listing