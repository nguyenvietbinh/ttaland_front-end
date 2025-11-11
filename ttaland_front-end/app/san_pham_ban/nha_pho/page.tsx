'use client'

import { useEffect, useState } from "react"
import Listing from "@/components/listing/listing"
import NavBar from "@/components/nav_bar/navbar"
import Footer from "@/components/layout/footer"
import { getProduct } from "@/network/GET/product"
import { ProductType } from "@/types/product"

const San_pham_ban_nha_pho = () => {
  const [listingData, setListingData] = useState<{
    isForSale: boolean
    type: 'townhouse' | 'villa' | 'apartment' | 'land'
    products: ProductType[]
  }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct.getSaleTownhouses()
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

export default San_pham_ban_nha_pho