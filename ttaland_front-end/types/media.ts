export interface MediaFile {
  id: string
  media_type: 'image' | 'video'
  file: string
  file_url?: string
  uploaded_at: string
  order: number
}
