import { Controller, Get, Param, Res } from '@nestjs/common'
import { WordService } from './word.service'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Word')
@Controller('word')
@Roles(Role.Coordinator, Role.Admin)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get(':CriterionId/:RecopilationId')
  async generateWord(
    @Param('CriterionId') CriterionId: string,
    @Param('RecopilationId') RecopilationId: string,
    @Res() res
  ) {
    try {
      // const prueba = await this.wordService.findInformationCollections(
      //   +CriterionId,
      //   +RecopilationId
      // )
      // res.send(prueba)

      const buffer = await this.wordService.generateWord(
        +CriterionId,
        +RecopilationId
      )
      res.set({
        'Content-Type': 'application/docx',
        'Content-Disposition':
          'attachment; filename=Andres Bello Guayana Catholic University_Venezuela_' +
          buffer.index +
          '_' +
          buffer.subIndex +
          '_' +
          buffer.criterionName +
          '.docx',
        'Content-Length': buffer.buffer.length,
        'Access-Control-Expose-Headers': 'Content-Disposition'
      })
      res.send(buffer.buffer)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
