import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'
import { EvidenceType } from '../evidences.constants'

@ChildEntity(EvidenceType.DOCUMENT)
export class Document extends Evidence {
  @Column({ type: 'text' })
  fileLink: string
}
