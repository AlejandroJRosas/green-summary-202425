import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'

@ChildEntity()
export class Link extends Evidence {
  @Column()
  externalLink: string
}
