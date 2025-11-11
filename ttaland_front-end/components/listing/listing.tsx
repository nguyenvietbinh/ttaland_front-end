
'use client'
import San_pham_ban_property from './show_property/san_pham_ban_show_property';
import San_pham_cho_thue_property from './show_property/san_pham_cho_thue_show_property';
import Sub_navbar from './sub_navbar';
import Listing_sidebar from '../sidebar/listing_sidebar';
import { useEffect, useState } from 'react';
import { filter_with_price, filter_with_area, filter_with_location } from './utils';
import { ProductType } from '@/types/product';

interface Listing_props {
  listing_return: {
    isForSale: boolean,
    type: 'townhouse' | 'villa' | 'apartment' | 'land',
    products: ProductType[]
  }
}

const Listing = ({listing_return}: Listing_props) => {
  const [priceConditionLst, setPriceConditionLst] = useState<string[]>([])
  const [areaConditionLst, setAreaConditionLst] = useState<string[]>([])
  const [locationConditionLst, setLocationConditionLst] = useState<string[]>([])
  const [filteredProperties, setFilteredProperties] = useState<ProductType[]>()

  
  useEffect(() => {
    const newProperties = filter_with_price(priceConditionLst, filter_with_area(areaConditionLst, filter_with_location(locationConditionLst, listing_return.products)))
    setFilteredProperties(newProperties)
  }, [priceConditionLst, areaConditionLst, listing_return, locationConditionLst])

  return (
    <div className='main_container flex-col'>
      <Sub_navbar currentPropertyType={listing_return.type} />
      <div className='flex'>
        <div className="content_container">

        <div>
          {filteredProperties && filteredProperties.length === 0 && (
            <div>Không có sản phẩm nào!!!</div>
          )}
        </div>



          {filteredProperties && (
            <div>
              {listing_return.isForSale ? (
                <div className='grid grid-cols-1 gap-16'>
                  {filteredProperties.map((item, index) => (
                    <San_pham_ban_property key={index} property={item}/>
                  ))}
                </div>
              ) : (
                <div className='grid grid-cols-1 gap-16'>
                  {filteredProperties.map((item, index) => (
                    <San_pham_cho_thue_property key={index} property={item}/>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <Listing_sidebar for_sale={listing_return.isForSale} setPriceConditionLstProp={setPriceConditionLst} setAreaConditionLstProp={(setAreaConditionLst)} setLocationConditionLstProp={setLocationConditionLst}/>
        </div>
      </div>
    </div>
  )
}


export default Listing