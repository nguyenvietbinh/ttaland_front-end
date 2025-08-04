
'use client'
import { usePathname } from 'next/navigation';
import Du_an_property from './show_property/du_an_show_property';
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import { useTownhouses } from '@/hooks/useTownhouses';
import { useVillas } from '@/hooks/useVillas';
import { useApartments } from '@/hooks/useApartments';
import { useLand } from '@/hooks/useLand';
import { LoadingErrorState, LoadMoreButton } from './ListingStates';

const Listing = () => {
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho', 'tat_ca']
  const list_path: string[] = path_name.split('/')

  // Use hooks for different property types
  const townhouseData = useTownhouses()
  const villaData = useVillas()
  const apartmentData = useApartments()
  const landData = useLand()
  
  // Fallback items for other categories
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  
  // Property type configuration
  const propertyTypes = {
    nha_pho: {
      data: townhouseData,
      items: townhouseData.townhouses,
      renderItem: (item: any) => <San_pham_ban_property key={item.id} townhouse={item} />
    },
    biet_thu: {
      data: villaData,
      items: villaData.villas,
      renderItem: (item: any) => <San_pham_ban_property key={item.id} villa={item} />
    },
    can_ho: {
      data: apartmentData,
      items: apartmentData.apartments,
      renderItem: (item: any) => <San_pham_ban_property key={item.id} apartment={item} />
    },
    dat_nen: {
      data: landData,
      items: landData.landLots,
      renderItem: (item: any) => <San_pham_ban_property key={item.id} land={item} />
    }
  }

  const currentPropertyType = list_path[2] as keyof typeof propertyTypes
  const isForSale = list_path[1] === 'san_pham_ban'
  const hasPropertyType = currentPropertyType in propertyTypes && isForSale
  
  const currentData = hasPropertyType ? propertyTypes[currentPropertyType] : null

  return (
    <div>
      <div className="">
        <div className={category.includes(list_path[2]) ? "px-2 xl:mx-0 grid grid-cols-1  lg:grid-cols-2 gap-8" : "hidden"}>
          
          {/* Show loading/error state for property types with API data */}
          {hasPropertyType && (
            <LoadingErrorState 
              isLoading={currentData!.data.loading} 
              error={currentData!.data.error}
            />
          )}

          {/* Render API data for supported property types */}
          {hasPropertyType && !currentData!.data.loading && !currentData!.data.error && 
            currentData!.items.map((item: any) => currentData!.renderItem(item))
          }

          {/* Render mock data for other categories */}  
          {!hasPropertyType && items.map((item, index) => (
            <div key={index}>
              {(list_path[1] === 'san_pham_ban') ? (<San_pham_ban_property />) : (list_path[1] === 'san_pham_cho_thue') ? (<San_pham_cho_thue_property/>) : (<Du_an_property/>)}
            </div>
          ))}

          {/* Load more button for property types with API data */}
          {hasPropertyType && (
            <LoadMoreButton 
              isLoading={currentData!.data.loading}
              hasMore={currentData!.data.hasMore}
              onLoadMore={currentData!.data.loadMore}
            />
          )}
        </div>
      </div>
    </div>
  )
}


export default Listing