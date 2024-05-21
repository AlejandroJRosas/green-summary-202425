import { PartialType } from '@nestjs/swagger'
import { CreateRecommendDto } from './create-recommend.dto'

export class UpdateRecommendDto extends PartialType(CreateRecommendDto) {}
