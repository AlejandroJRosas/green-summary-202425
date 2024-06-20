export interface Evidence {
  uploadDate: string
  description: string
  error: string
  type: 'document' | 'link' | 'image'
  externalLink: string
  fileLink: string
  collectionId: 0
}
