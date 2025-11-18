const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
import { postproduct } from "../products/POST_products"

export interface postNewsData {
  title: string
  src: string
  images: {
    name: string,
    type: string
  }[]
  thumb: {
    name: string
    type: string
  }
  discription: string
  contents: {
    type: 'title' | 'image' | 'text'
    content: string
    imageTitle?: string
  }[]
}



class PostNews {
  async uploadNews<T>(body: postNewsData, files: File[]): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      const res = await response.json()
      postproduct.uploadFileToS3(res.uploadUrls, files)
      return res
    } catch (error) {
      console.error(`Failed to fetch from /news:`, error)
      throw error
    }
  }

}




export const postnews = new PostNews()
