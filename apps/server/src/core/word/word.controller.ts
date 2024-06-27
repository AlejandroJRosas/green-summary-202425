import { Controller, Get } from '@nestjs/common'
import { WordService } from './word.service'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Word')
@Controller('word')
@Roles(Role.Coordinator, Role.Admin)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  findAll() {
    return this.wordService.findAll()
  }
}
