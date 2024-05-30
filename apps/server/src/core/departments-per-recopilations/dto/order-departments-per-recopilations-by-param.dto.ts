import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import {
  SORTABLE_FIELDS,
  SortableField
} from '../departments-per-recopilations.constants'

export class OrderByParamDto {
  @ApiProperty({ enum: SORTABLE_FIELDS })
  @ApiPropertyOptional()
  @IsEnum(SORTABLE_FIELDS)
  @IsString()
  @IsOptional()
  orderBy: SortableField
}
