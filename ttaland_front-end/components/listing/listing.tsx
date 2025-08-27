
'use client'
import Du_an_property from './show_property/du_an_show_property';
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
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

interface PropertyItem {
  id: string | number;
  [key: string]: unknown;
}
import { LoadingErrorState, LoadMoreButton } from './ListingStates';
import Sub_navbar from './sub_navbar';

interface Listing_props {
  currentPropertyType: 'townhouse' | 'villa' | 'apartment' | 'land'
  isForSale: boolean
  isForRent: boolean
}

const Listing = ({currentPropertyType, isForSale, isForRent}: Listing_props) => {


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
    townhouse: {
      data: isForRent ? rentalTownhouseData : saleTownhouseData,
      items: isForRent ? rentalTownhouseData.townhouses : saleTownhouseData.townhouses,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} townhouse={item as never} /> : 
        <San_pham_ban_property key={item.id} townhouse={item as never} />
    },
    villa: {
      data: isForRent ? rentalVillaData : saleVillaData,
      items: isForRent ? rentalVillaData.villas : saleVillaData.villas,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} villa={item as never} /> : 
        <San_pham_ban_property key={item.id} villa={item as never} />
    },
    apartment: {
      data: isForRent ? rentalApartmentData : saleApartmentData,
      items: isForRent ? rentalApartmentData.apartments : saleApartmentData.apartments,
      renderItem: (item: PropertyItem) => isForRent ?
        <San_pham_cho_thue_property key={item.id} apartment={item as never} /> : 
        <San_pham_ban_property key={item.id} apartment={item as never} />
    },
    land: {
      data: isForRent ? rentalLandData : saleLandData,
      items: isForRent ? rentalLandData.landLots : saleLandData.landLots,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} land={item as never} /> : 
        <San_pham_ban_property key={item.id} land={item as never} />
    }
  };
  
  
  const currentData = propertyTypes[currentPropertyType]

  return (
    <div>
      <Sub_navbar currentPropertyType={currentPropertyType} isForSale={isForSale} isForRent={isForRent}/>
      <div className="px-2 xl:mx-0 grid grid-cols-1  lg:grid-cols-2 gap-8">
        
        {/* Show loading state only when loading and no error */}
        {currentData!.data.loading && !currentData!.data.error && (
          <LoadingErrorState 
            isLoading={true} 
            error={null}
          />
        )}

        {/* Render API data for supported property types when successful */}
        {!currentData!.data.loading && !currentData!.data.error && 
          (currentData!.items as unknown as PropertyItem[]).map((item: PropertyItem) => currentData!.renderItem(item))
        }

        {/* Show mock data when: 1) No API integration, 2) API has error, 3) API returns empty results */}
        {(currentData!.data.error || (!currentData!.data.loading && !currentData!.data.error && (currentData!.items as unknown as PropertyItem[]).length === 0)
        ) && items.map((item, index) => (
          <div key={index}>
            {(isForSale) ? (<San_pham_ban_property />) : (isForRent) ? (<San_pham_cho_thue_property/>) : (<Du_an_property/>)}
          </div>
        ))}

        {/* Show error message when API fails (optional - alongside mock data) */}
        {currentData!.data.error && (
          <div className="text-center py-4 text-yellow-400 bg-yellow-900/20 rounded">
            <p>🔧 Backend không hoạt động - hiển thị mock data để tiện development</p>
            <p className="text-base mt-1">Lỗi: {currentData!.data.error}</p>
          </div>
        )}

        {/* Load more button for property types with API data - only show when API is working */}
        {!currentData!.data.error && (
          <LoadMoreButton 
            isLoading={currentData!.data.loading}
            hasMore={currentData!.data.hasMore}
            onLoadMore={currentData!.data.loadMore}
          />
        )}
      </div>
    </div>
  )
}


export default Listing