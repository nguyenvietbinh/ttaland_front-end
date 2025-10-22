
'use client'
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import Sub_navbar from './sub_navbar';
import { ShowPropertyReturn } from '@/types/api/showProperties';
import Listing_sidebar from '../sidebar/listing_sidebar';

interface Listing_props {
  listing_return: ShowPropertyReturn
}

const Listing = ({listing_return}: Listing_props) => {
  
  return (
    <div className='main_container flex-col'>
      <Sub_navbar currentPropertyType={listing_return.type} />
      <div className='flex'>
        <div className="grid grid-cols-1 content_container gap-16">
          {/* Render API data for supported property types when successful */}
          {listing_return.properties.map((item, index) => (
            <div key={index}>
              {(item.for_sale) ? (
                <San_pham_ban_property property={item}/>
              ) : (
                <San_pham_cho_thue_property property={item}/>
              )}
            </div>
          ))}
        </div>
        <div>
          <Listing_sidebar for_sale={listing_return.for_sale}/>
        </div>
      </div>
    </div>
  )
}


export default Listing