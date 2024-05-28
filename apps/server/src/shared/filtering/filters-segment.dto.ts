import { Transform } from 'class-transformer'
import { parseFiltersSegment } from './parse-filters-segment'
import { Filter } from './filter.type'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class FiltersSegmentDto {
  @ApiProperty({
    type: String,
    required: false,
    externalDocs: {
      description: 'Filtering Segment API Documentation',
      url: 'https://github.com/AlejandroJRosas/green-summary-202425/tree/main/apps/server/src/shared/filtering'
    },
    description:
      'More info (https://github.com/AlejandroJRosas/green-summary-202425/tree/main/apps/server/src/shared/filtering).'
  })
  @Transform(
    (segment) => {
      return parseFiltersSegment(segment.value)
    },
    { toClassOnly: true }
  )
  @IsOptional()
  filters: Filter[]
}
