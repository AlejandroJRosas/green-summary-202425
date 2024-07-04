import { Controller, Get, Param } from '@nestjs/common'
import { SummaryInformationService } from './summary-information.service'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'

@ApiTags('Summary-information')
@Controller('summary-information')
@Roles(Role.Coordinator, Role.Admin)
export class SummaryInformationController {
  constructor(
    private readonly summaryInformationService: SummaryInformationService
  ) {}

  @Get(':idCrit/:idRecop')
  async findInformationCollections(
    @Param('idCrit') idCrit: string,
    @Param('idRecop') idRecop: string
  ) {
    return await this.summaryInformationService.findInformationCollections(
      +idCrit,
      +idRecop
    )
  }
}
