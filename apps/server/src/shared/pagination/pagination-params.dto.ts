import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'

export class PaginationParams {
  @ApiPropertyOptional()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  itemsPerPage: number

  @ApiPropertyOptional()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number
}
