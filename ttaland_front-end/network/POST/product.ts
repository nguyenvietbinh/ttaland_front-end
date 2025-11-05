const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface postProductData {
  type: 'townhouse' | 'villa' | 'land' | 'apartment'
  title: string
  isForSale: boolean,
  location: string
  coordinate: [number, number]
  detail_location?: string
  price: number
  area: number
  bedroom?: string
  bathroom?: string
  discription: string
  policy?: string
  numberOfFloors?: string
  interior?: string
  entranceWay?: string
}



class PostProduct {
  private async postProduct<T>(endpoint: string, body: object): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }

  async postTownhouse(body: object) {
    return this.postProduct('/products/townhouses', body)
  }
}


export const postproduct = new PostProduct()