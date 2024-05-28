import { Transform } from 'class-transformer'
import { parseFiltersSegment } from './parse-filters-segment'
import { Filter } from './filter.type'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class FiltersSegmentDto {
  @ApiProperty({ type: String, required: false })
  @Transform(
    (segment) => {
      return parseFiltersSegment(segment.value)
    },
    { toClassOnly: true }
  )
  @IsOptional()
  filters: Filter[]
}
