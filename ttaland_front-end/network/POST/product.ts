const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface postProductData {
  type: 'townhouse' | 'villa' | 'land' | 'apartment'
  title: string
  isForSale: boolean,
  location: string
  coordinate: {
    longitude: string,
    latitude: string
  }
  detail_location?: string
  price?: string
  area?: string
  bedroom?: string
  bathroom?: string
  discription: string
  policy?: string
  numberOfFloors?: string
  interior?: string
  entranceWay?: string
  images: {
    name: string,
    type: string
  }[]
  videoUrl?: string
}



class PostProduct {
  private async uploadProduct<T>(endpoint: string, body: object): Promise<T> {
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

  private async uploadFileToS3(uploadUrls: string[], files: File[]) {
    for (let i = 0; i < files.length; i ++) {
      const res = await fetch(uploadUrls[i], {
        method: "PUT",
        headers: { "Content-Type": files[i].type },
        body: files[i],
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      console.log("✅ Uploaded successfully!");
    }
  }

  async postTownhouse(body: postProductData, files: File[]) {
    const postproductRes: {message: string, product_id: string, uploadUrls: string[]} = await this.uploadProduct('/products/townhouses', body)
    await this.uploadFileToS3(postproductRes.uploadUrls, files)
  }

  async postVillas(body: postProductData, files: File[]) {
    const postproductRes: {message: string, product_id: string, uploadUrls: string[]} = await this.uploadProduct('/products/villas', body)
    await this.uploadFileToS3(postproductRes.uploadUrls, files)
  }

  async postLand(body: postProductData, files: File[]) {
    const postproductRes: {message: string, product_id: string, uploadUrls: string[]} = await this.uploadProduct('/products/land', body)
    await this.uploadFileToS3(postproductRes.uploadUrls, files)
  }

  async postApartments(body: postProductData, files: File[]) {
    const postproductRes: {message: string, product_id: string, uploadUrls: string[]} = await this.uploadProduct('/products/apartments', body)
    await this.uploadFileToS3(postproductRes.uploadUrls, files)
  }

  postProduct(body: postProductData, files: File[]) {
    if (body.type === 'townhouse') {
      this.postTownhouse(body, files)
    } else if (body.type === 'villa') {
      this.postVillas(body, files)
    } else if (body.type === 'land') {
      this.postLand(body, files)
    } else if (body.type === 'apartment') {
      this.postApartments(body, files)
    }
  }

}


export const postproduct = new PostProduct()