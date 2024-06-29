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

  @Get(':idCrit/:idRecop')
  async generateWord(
    @Param('idCrit') idCrit: number,
    @Param('idRecop') idRecop: number,
    @Res() res
  ) {
    try {
      const prueba = await this.wordService.findInformationCollections(
        idCrit,
        idRecop
      )
      //const buffer = await this.wordService.findCategory(idCrit,idRecop);

      // res.set({
      //   'Content-Type':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   'Content-Disposition': 'attachment; filename=archivo.docx',
      //   'Content-Length': buffer.length
      // })
      //res.send(buffer)
      res.send(prueba)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
