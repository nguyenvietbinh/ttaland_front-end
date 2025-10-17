// hooks/useProductStorage.ts
'use client';



export function useLocalStorage() {

  const primeryWatchedProductData = window.localStorage.getItem('watched_product_id')?.trimEnd()


  const getWatchedProductData = () => {
    if (primeryWatchedProductData) {
      return primeryWatchedProductData.split(' ')
    }
    return []
  }


  const isRepeatedProduct = (product_id: string) => {
    const watchedProductData: string[] = getWatchedProductData()
    if (watchedProductData.includes(product_id.trimEnd())) {
      return true
    }
    return false
  }

  const addWatchedProduct = (product_id: string) => {
    if (!isRepeatedProduct(product_id)) {
      let newWatchedProducts
      if (primeryWatchedProductData) {
        newWatchedProducts = primeryWatchedProductData + ' ' + product_id
      } else {
        newWatchedProducts = product_id
      }
      window.localStorage.setItem('watched_product_id', newWatchedProducts)
    }
  }




  return {
    getWatchedProductData,
    addWatchedProduct
  };
}