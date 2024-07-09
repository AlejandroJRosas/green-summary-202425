import { InformationCollection } from './information-collection.type'

export interface Evidence {
  id: number
  description: string
  error: string
  type: 'document' | 'link' | 'image' | ''
  externalLink: string | null
  fileLink: string | null
  collection: InformationCollection
}
