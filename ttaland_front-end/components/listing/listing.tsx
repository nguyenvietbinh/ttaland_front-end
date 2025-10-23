
'use client'
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import Sub_navbar from './sub_navbar';
import { ShowPropertyReturn } from '@/types/api/showProperties';
import Listing_sidebar from '../sidebar/listing_sidebar';
import { useEffect, useState } from 'react';
import { ShowProperty } from '@/types/api/showProperties';
import { filter_with_price, filter_with_area, filter_with_location } from './utils';

interface Listing_props {
  listing_return: ShowPropertyReturn
}

const Listing = ({listing_return}: Listing_props) => {
  const [priceConditionLst, setPriceConditionLst] = useState<string[]>([])
  const [areaConditionLst, setAreaConditionLst] = useState<string[]>([])
  const [locationConditionLst, setLocationConditionLst] = useState<string[]>([])
  const [filteredProperties, setFilteredProperties] = useState<ShowProperty[]>()

  
  useEffect(() => {
    const newProperties = filter_with_price(priceConditionLst, filter_with_area(areaConditionLst, filter_with_location(locationConditionLst, listing_return.properties)))
    setFilteredProperties(newProperties)
  }, [priceConditionLst, areaConditionLst, listing_return.properties, locationConditionLst])

  return (
    <div className='main_container flex-col'>
      <Sub_navbar currentPropertyType={listing_return.type} />
      <div className='flex'>
        <div className="content_container">
          {listing_return.loading ? (
            <div>Đang tải dữ liệu sản phẩm...</div>
          ) : (
            <div>
              {filteredProperties && filteredProperties.length === 0 && (
                <div>Không có sản phẩm nào!!!</div>
              )}
            </div>
          )}



          {filteredProperties && (
            <div className='grid grid-cols-1 gap-16'>
              {filteredProperties.map((item, index) => (
                <div className='' key={index}>
                  {(item.for_sale) ? (
                    <San_pham_ban_property property={item}/>
                  ) : (
                    <San_pham_cho_thue_property property={item}/>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Listing_sidebar for_sale={listing_return.for_sale} setPriceConditionLstProp={setPriceConditionLst} setAreaConditionLstProp={(setAreaConditionLst)} setLocationConditionLstProp={setLocationConditionLst}/>
        </div>
      </div>
    </div>
  )
}


export default Listing