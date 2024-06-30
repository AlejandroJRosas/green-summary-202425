import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Injectable()
export class SummaryInformationService {
  constructor(
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>,
    @InjectRepository(Criteria)
    private criteriaRepository: Repository<Criteria>,
    @InjectRepository(Recopilation)
    private recopilationRepository: Repository<Recopilation>,
    @InjectRepository(CategorizedCriteria)
    private categorizedCriteriaRepository: Repository<CategorizedCriteria>
  ) {}

  async findInformationCollections(idCrit: number, idRecop: number) {
    const [recopilation, criterion] = await Promise.all([
      this.recopilationRepository.findOneByOrFail({
        id: idRecop
      }),
      this.criteriaRepository.findOneByOrFail({
        id: idCrit
      })
    ])

    const categorizedCriteria =
      await this.categorizedCriteriaRepository.findOneOrFail({
        where: {
          recopilation: { id: recopilation.id },
          criteria: { id: criterion.id }
        },
        relations: ['recopilation', 'category', 'criteria']
      })

    const informationCollections =
      await this.informationCollectionsRepository.find({
        where: {
          recopilation: (await categorizedCriteria).recopilation,
          category: (await categorizedCriteria).category
        },
        relations: ['department', 'evidences']
      })

    return { criterion, recopilation, informationCollections }
  }
}
