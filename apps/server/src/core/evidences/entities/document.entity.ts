import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'
import { EvidenceType } from '../constants'

@ChildEntity(EvidenceType.DOCUMENT)
export class Document extends Evidence {
  @Column()
  fileLink: string
}
