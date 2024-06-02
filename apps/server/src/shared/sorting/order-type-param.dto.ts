import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class OrderTypeParamDto {
  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderType: 'ASC' | 'DESC'
}
