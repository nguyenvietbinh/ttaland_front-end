

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

import { TownhouseType, VillaType, LandType, ApartmentType, ProductType } from "@/types/product"

class GetProduct {
  async getProductWithID(product_id: string, table: 'townhouses' | 'villas' | 'land' | 'apartments'): Promise<ProductType> {
    const endpoint = `${BASE_URL}/products/${table}/${product_id}`
    console.log(endpoint)
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }

  async getTownhouses(): Promise<TownhouseType[]> {
    const endpoint = `${BASE_URL}/products/townhouses`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }
  
  async getVillas(): Promise<VillaType[]> {
    const endpoint = `${BASE_URL}/products/villas`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }

  async getLand(): Promise<LandType[]> {
    const endpoint = `${BASE_URL}/products/land`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }

  async getApartments(): Promise<ApartmentType[]> {
    const endpoint = `${BASE_URL}/products/apartments`
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }


  async getSaleTownhouses(): Promise<{
    isForSale: true,
    type: 'townhouse'
    products: TownhouseType[]
  }> {
    const ans: TownhouseType[] = []
    const res = await this.getTownhouses()
    for (let i = 0; i < res.length; i ++) {
      if (res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: true,
      type: 'townhouse',
      products: ans
    }
  }

  async getRentTownhouses(): Promise<{
    isForSale: false,
    type: 'townhouse'
    products: TownhouseType[]
  }> {
    const ans: TownhouseType[] = []
    const res = await this.getTownhouses()
    for (let i = 0; i < res.length; i ++) {
      if (!res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: false,
      type: 'townhouse',
      products: ans
    }
  }

  async getSaleVillas(): Promise<{
    isForSale: true,
    type: 'villa'
    products: VillaType[]
  }> {
    const ans: VillaType[] = []
    const res = await this.getVillas()
    for (let i = 0; i < res.length; i ++) {
      if (res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: true,
      type: 'villa',
      products: ans
    }
  }

  async getRentVillas(): Promise<{
    isForSale: false,
    type: 'villa'
    products: VillaType[]
  }> {
    const ans: VillaType[] = []
    const res = await this.getVillas()
    for (let i = 0; i < res.length; i ++) {
      if (!res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: false,
      type: 'villa',
      products: ans
    }
  }

  async getSaleLand(): Promise<{
    isForSale: true,
    type: 'land'
    products: LandType[]
  }> {
    const ans: LandType[] = []
    const res = await this.getLand()
    for (let i = 0; i < res.length; i ++) {
      if (res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: true,
      type: 'land',
      products: ans
    }
  }

  async getRentLand(): Promise<{
    isForSale: false,
    type: 'land'
    products: LandType[]
  }> {
    const ans: LandType[] = []
    const res = await this.getLand()
    for (let i = 0; i < res.length; i ++) {
      if (!res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: false,
      type: 'land',
      products: ans
    }
  }

  async getSaleApartments(): Promise<{
    isForSale: true,
    type: 'apartment'
    products: ApartmentType[]
  }> {
    const ans: ApartmentType[] = []
    const res = await this.getApartments()
    for (let i = 0; i < res.length; i ++) {
      if (res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: true,
      type: 'apartment',
      products: ans
    }
  }

  async getRentApartments(): Promise<{
    isForSale: false,
    type: 'apartment'
    products: ApartmentType[]
  }> {
    const ans: ApartmentType[] = []
    const res = await this.getApartments()
    for (let i = 0; i < res.length; i ++) {
      if (!res[i].isForSale) {
        ans.push(res[i])
      }
    }
    return {
      isForSale: false,
      type: 'apartment',
      products: ans
    }
  }
}


export const getProduct = new GetProduct()