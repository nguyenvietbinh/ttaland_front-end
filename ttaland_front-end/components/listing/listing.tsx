
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
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types/project';

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
  isProject?: boolean // New flag to indicate if this is a project listing
}

const Listing = ({currentPropertyType, isForRent, isProject = false}: Listing_props) => {

  // Use appropriate hooks based on the page type
  const saleTownhouseData = useSaleTownhouses()
  const saleVillaData = useSaleVillas()
  const saleApartmentData = useSaleApartments()
  const saleLandData = useSaleLand()

  const rentalTownhouseData = useRentalTownhouses()
  const rentalVillaData = useRentalVillas()
  const rentalApartmentData = useRentalApartments()
  const rentalLandData = useRentalLand()

  // Project data hook
  const projectData = useProjects()
  
  // If this is a project listing, use project data
  if (isProject) {
    return (
      <div>
        <Sub_navbar currentPropertyType={currentPropertyType}/>
        <div className="px-2 xl:mx-0 grid grid-cols-1  lg:grid-cols-2 gap-8">
          
          {/* Show loading state only when loading and no error */}
          {projectData.loading && !projectData.error && (
            <LoadingErrorState 
              isLoading={true} 
              error={null}
            />
          )}

          {/* Render project data when successful */}
          {!projectData.loading && !projectData.error && projectData.projects.length > 0 && 
            projectData.projects.map((project: Project) => (
              <Du_an_property key={project.id} />
            ))
          }

          {(projectData.projects.length === 0 && !projectData.loading)
           && (
            <div >
              Không tìm thấy sản phẩm nào!
            </div>
          )}


          {/* Load more button for projects - only show when API is working */}
          {!projectData.error && (
            <LoadMoreButton 
              isLoading={projectData.loading}
              hasMore={projectData.hasMore}
              onLoadMore={projectData.loadMore}
            />
          )}
        </div>
      </div>
    )
  }
  
  // Property type configuration for non-project listings
  const propertyTypes = {
    townhouse: {
      data: isForRent ? rentalTownhouseData : saleTownhouseData,
      items: isForRent ? rentalTownhouseData.townhouses : saleTownhouseData.townhouses,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} property={item as never} /> : 
        <San_pham_ban_property key={item.id} property={item as never} />
    },
    villa: {
      data: isForRent ? rentalVillaData : saleVillaData,
      items: isForRent ? rentalVillaData.villas : saleVillaData.villas,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} property={item as never} /> : 
        <San_pham_ban_property key={item.id} property={item as never} />
    },
    apartment: {
      data: isForRent ? rentalApartmentData : saleApartmentData,
      items: isForRent ? rentalApartmentData.apartments : saleApartmentData.apartments,
      renderItem: (item: PropertyItem) => isForRent ?
        <San_pham_cho_thue_property key={item.id} property={item as never} /> : 
        <San_pham_ban_property key={item.id} property={item as never} />
    },
    land: {
      data: isForRent ? rentalLandData : saleLandData,
      items: isForRent ? rentalLandData.landLots : saleLandData.landLots,
      renderItem: (item: PropertyItem) => isForRent ? 
        <San_pham_cho_thue_property key={item.id} property={item as never} /> : 
        <San_pham_ban_property key={item.id} property={item as never} />
    }
  };
  
  
  const currentData = propertyTypes[currentPropertyType]

  return (
    <div className='main_container flex-col'>
      <Sub_navbar currentPropertyType={currentPropertyType} />
      <div className="grid grid-cols-1 content_container gap-8">
        
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
        {(!currentData!.data.loading && (currentData!.items as unknown as PropertyItem[]).length === 0) && (
          <div>
            Không tìm thấy sản phẩm nào!
          </div>
        )}
        {currentData!.data.error && (
          <p>🔧 Backend không hoạt động</p>
        )}
      </div>
    </div>
  )
}


export default Listing