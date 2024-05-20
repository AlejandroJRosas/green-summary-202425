import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'

@ChildEntity()
export class Document extends Evidence {
  @Column()
  fileLink: string
}
