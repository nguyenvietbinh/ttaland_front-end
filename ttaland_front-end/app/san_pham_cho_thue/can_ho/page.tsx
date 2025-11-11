'use client'

import Footer from "@/components/layout/footer"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import { useState, useEffect } from "react"
import { getProduct } from "@/network/GET/product"
import { ProductType } from "@/types/product"


const San_pham_cho_thue_san_ho = () => {
  const [listingData, setListingData] = useState<{
    isForSale: boolean
    type: 'townhouse' | 'villa' | 'apartment' | 'land'
    products: ProductType[]
  }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct.getRentApartments()
        setListingData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])


  return (
    <>
      <NavBar/>
      {listingData ? (
        <Listing listing_return={listingData}/>
      ) : (
        <div className="main_container">Loading ....</div>
      )}
      <Footer/>
    </>
  )
}

export default San_pham_cho_thue_san_ho