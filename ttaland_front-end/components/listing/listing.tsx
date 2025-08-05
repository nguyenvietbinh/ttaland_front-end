
'use client'
import { usePathname } from 'next/navigation';
import Du_an_property from './show_property/du_an_show_property';
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import { useTownhouses } from '@/hooks/useTownhouses';
import { useVillas } from '@/hooks/useVillas';
import { useApartments } from '@/hooks/useApartments';
import { useLand } from '@/hooks/useLand';
import { 
  useRentalTownhouses, 
  useRentalVillas, 
  useRentalApartments, 
  useRentalLand,
  useSaleTownhouses,
  useSaleVillas,
  useSaleApartments,
  useSaleLand
} from '@/hooks/useRentalProperties';
import { LoadingErrorState, LoadMoreButton } from './ListingStates';

const Listing = () => {
  const path_name = usePathname()
  const category: string[] = ['dat_nen', 'nha_pho', 'biet_thu', 'can_ho', 'tat_ca']
  const list_path: string[] = path_name.split('/')

  const isForSale = list_path[1] === 'san_pham_ban'
  const isForRent = list_path[1] === 'san_pham_cho_thue'

  // Use appropriate hooks based on the page type
  const saleTownhouseData = useSaleTownhouses()
  const saleVillaData = useSaleVillas()
  const saleApartmentData = useSaleApartments()
  const saleLandData = useSaleLand()

  const rentalTownhouseData = useRentalTownhouses()
  const rentalVillaData = useRentalVillas()
  const rentalApartmentData = useRentalApartments()
  const rentalLandData = useRentalLand()
  
  // Fallback items for other categories
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  
  // Property type configuration
  const propertyTypes = {
    nha_pho: {
      data: isForRent ? rentalTownhouseData : saleTownhouseData,
      items: isForRent ? rentalTownhouseData.townhouses : saleTownhouseData.townhouses,
      renderItem: (item: any) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} townhouse={item} /> : 
        <San_pham_ban_property key={item.id} townhouse={item} />
    },
    biet_thu: {
      data: isForRent ? rentalVillaData : saleVillaData,
      items: isForRent ? rentalVillaData.villas : saleVillaData.villas,
      renderItem: (item: any) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} villa={item} /> : 
        <San_pham_ban_property key={item.id} villa={item} />
    },
    can_ho: {
      data: isForRent ? rentalApartmentData : saleApartmentData,
      items: isForRent ? rentalApartmentData.apartments : saleApartmentData.apartments,
      renderItem: (item: any) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} apartment={item} /> : 
        <San_pham_ban_property key={item.id} apartment={item} />
    },
    dat_nen: {
      data: isForRent ? rentalLandData : saleLandData,
      items: isForRent ? rentalLandData.landLots : saleLandData.landLots,
      renderItem: (item: any) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} land={item} /> : 
        <San_pham_ban_property key={item.id} land={item} />
    }
  }

  const currentPropertyType = list_path[2] as keyof typeof propertyTypes
  const hasPropertyType = currentPropertyType in propertyTypes && (isForSale || isForRent)
  
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