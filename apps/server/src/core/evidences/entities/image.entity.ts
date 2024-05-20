import { ChildEntity, Column } from 'typeorm'
import { Evidence } from './evidence.entity'

@ChildEntity()
export class Image extends Evidence {
  @Column()
  fileLink: string

  @Column({ nullable: true })
  externalLink?: string
}
