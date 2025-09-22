export interface SimilarProductItem {
  id: string
  title: string
  price: string
  price_formatted: string
  area: string
  area_formatted: string
  location: string
  images: string[]
  create_at: string
}

export interface SimilarProductsResponse {
  product_id: string
  similar_products: SimilarProductItem[]
  count: number
  criteria: {
    type: string
    price_range: string
    area_range: string
    for_sale: boolean
  }
}
