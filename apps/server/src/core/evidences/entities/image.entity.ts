import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'
import { EvidenceType } from '../constants'

@ChildEntity(EvidenceType.IMAGE)
export class Image extends Evidence {
  @Column()
  fileLink: string

  @Column({ nullable: true })
  externalLink?: string
}
