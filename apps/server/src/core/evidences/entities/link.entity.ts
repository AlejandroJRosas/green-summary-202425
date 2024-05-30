import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'
import { EvidenceType } from '../evidences.constants'

@ChildEntity(EvidenceType.LINK)
export class Link extends Evidence {
  @Column()
  externalLink: string
}
