// hooks/useProductStorage.ts
'use client';

import { SimilarProductItem } from '@/types/similar';


export function useLocalStorage() {

  const watchedProductData = window.localStorage.getItem('watched_product_data')


  const getWatchedProductData = () => {
    if (watchedProductData) {
      return JSON.parse(watchedProductData)
    }
    return []
  }


  const isRepeatedProduct = (product_id: string) => {
    const watchedProductData = getWatchedProductData()
    for (let i = 0; i < watchedProductData.length; i ++) {
      if (watchedProductData[i].id === product_id) {
        return true
      }
    }
    return false
  }

  const addWatchedProduct = (product: SimilarProductItem) => {
    let watchedProductData: SimilarProductItem[] = getWatchedProductData()
    if (!isRepeatedProduct(product.id)) {
      watchedProductData.unshift(product)
      window.localStorage.setItem('watched_product_data', JSON.stringify(watchedProductData))
    }

  }




  return {
    getWatchedProductData,
    addWatchedProduct
  };
}