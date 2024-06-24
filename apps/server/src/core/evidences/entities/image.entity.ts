import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'
import { EvidenceType } from '../evidences.constants'

@ChildEntity(EvidenceType.IMAGE)
export class Image extends Evidence {
  @Column({ type: 'text' })
  fileLink: string

  @Column({ type: 'text', nullable: true })
  externalLink?: string
}
