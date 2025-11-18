const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface newsData {
  id: string
  created_at: string
  title: string
  src: string
  thumb: string
  discription: string
  contents: {
    type: 'title' | 'image' | 'text'
    content: string
    imageTitle?: string
  }[]
}

class GetNews {
  async getAllNews() {
    const endpoint = `${BASE_URL}/news`
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
  async getNewsWithID(id: string): Promise<newsData> {
    const endpoint = `${BASE_URL}/news/${id}`
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
}

export const getNews = new GetNews()