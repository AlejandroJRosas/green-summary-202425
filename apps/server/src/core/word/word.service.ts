import { Injectable } from '@nestjs/common'
import {
  Document,
  Packer,
  Paragraph,
  SectionType,
  TextRun,
  ImageRun,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom
} from 'docx'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Image } from '../evidences/entities/image.entity'
import { Link } from '../evidences/entities/link.entity'
import * as evidenceDocument from '../evidences/entities/document.entity'
import * as fs from 'fs'
import { Evidence } from '../evidences/entities/evidence.entity'

@Injectable()
export class WordService {
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
      this.criteriaRepository.findOneOrFail({
        where: {
          id: idCrit
        },
        relations: ['indicator']
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

    const arrayInfCol = await this.informationCollectionsRepository.find({
      where: {
        recopilation: categorizedCriteria.recopilation,
        category: categorizedCriteria.category
      },
      relations: ['department', 'evidences']
    })

    const informationCollections: InformationCollection[] = []
    let dep: string
    let flag = 0
    let order: Evidence[]
    let verify = 0
    let type: string

    //Para ordenar las colecciones de información por departamento
    arrayInfCol.forEach((informationCollection, index) => {
      if (index === 0) {
        informationCollections.push(informationCollection)
      }
      dep = informationCollection.department.fullName

      arrayInfCol.forEach((infCol) => {
        if (dep === infCol.department.fullName) {
          informationCollections.forEach((info) => {
            if (info.id === infCol.id) {
              flag = 1
            }
          })
          if (flag === 0) {
            informationCollections.push(infCol)
          }
          flag = 0
        }
      })
    })

    //Para ordenar las evidencias por tipo en cada colección de información
    informationCollections.forEach((inforCollec) => {
      order = []
      inforCollec.evidences.forEach((evidence, index) => {
        if (index === 0) {
          order.push(evidence)
        }
        type = evidence.type

        inforCollec.evidences.forEach((evid) => {
          if (type === evid.type) {
            order.forEach((info) => {
              if (info.id === evid.id) {
                verify = 1
              }
            })
            if (verify === 0) {
              order.push(evid)
            }
            verify = 0
          }
        })
      })
      inforCollec.evidences = order
    })

    return { criterion, recopilation, informationCollections }
  }

  private createEvidences(collections: InformationCollection[]): Paragraph[] {
    let prevDepartment: string
    let departmentName: string
    let collectionName: string
    let collectionDescription: string
    let fileLink: string
    let externalLink: string
    let evidenceDescription: string
    const parag: Paragraph[] = []

    collections.forEach((collection) => {
      departmentName = collection.department.fullName
      collectionName = collection.name
      collectionDescription = collection.summary
      if (prevDepartment === departmentName) {
        parag.push(
          new Paragraph({
            children: [new TextRun(collectionName)]
          }),
          new Paragraph({
            children: [new TextRun(collectionDescription)]
          }),
          new Paragraph({})
        )
      } else {
        parag.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'Departamento: ',
                bold: true
              }),
              new TextRun(departmentName)
            ]
          }),
          new Paragraph({
            children: [new TextRun(collectionName)]
          }),
          new Paragraph({
            children: [new TextRun(collectionDescription)]
          }),
          new Paragraph({})
        )
      }

      collection.evidences.forEach((evidence) => {
        if (evidence.error === null || evidence.error === '') {
          if (evidence.type === 'image') {
            fileLink = (evidence as Image).fileLink.split('uploads/')[1]
            evidenceDescription = evidence.description
            externalLink = (evidence as Image).externalLink

            parag.push(
              new Paragraph({
                children: [new TextRun(evidenceDescription)]
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: fs.readFileSync('./uploads/' + fileLink),
                    transformation: {
                      width: 300,
                      height: 168
                    }
                  })
                ]
              }),
              new Paragraph({
                children: [new TextRun(externalLink)]
              }),
              new Paragraph({})
            )
          }

          if (evidence.type === 'document') {
            fileLink = (evidence as evidenceDocument.Document).fileLink
            evidenceDescription = evidence.description

            parag.push(
              new Paragraph({
                children: [new TextRun(evidenceDescription)]
              }),
              new Paragraph({
                children: [new TextRun(fileLink)]
              }),
              new Paragraph({})
            )
          }

          if (evidence.type === 'link') {
            evidenceDescription = evidence.description
            externalLink = (evidence as Link).externalLink

            parag.push(
              new Paragraph({
                children: [new TextRun(evidenceDescription)]
              }),
              new Paragraph({
                children: [new TextRun(externalLink)]
              }),
              new Paragraph({})
            )
          }
        }
      })
      prevDepartment = departmentName
    })
    return parag
  }

  async generateWord(idCrit: number, idRecop: number) {
    const summary = this.findInformationCollections(idCrit, idRecop)
    const index = (await summary).criterion.indicator.index
    const indicatorName = (await summary).criterion.indicator.name

    const subIndex = (await summary).criterion.subIndex
    const criterionName = (await summary).criterion.name

    const collections = (await summary).informationCollections

    const doc = new Document({
      sections: [
        {
          properties: {
            type: SectionType.CONTINUOUS
          },
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: fs.readFileSync('./images/Ucab.jpg'),
                  transformation: {
                    width: 300,
                    height: 43
                  },
                  floating: {
                    horizontalPosition: {
                      relative: HorizontalPositionRelativeFrom.MARGIN,
                      align: HorizontalPositionAlign.LEFT
                    },
                    verticalPosition: {
                      relative: VerticalPositionRelativeFrom.MARGIN,
                      align: VerticalPositionAlign.INSIDE
                    }
                  }
                }),
                new ImageRun({
                  data: fs.readFileSync('./images/GM.jpg'),
                  transformation: {
                    width: 115,
                    height: 85
                  },
                  floating: {
                    horizontalPosition: {
                      relative: HorizontalPositionRelativeFrom.MARGIN,
                      align: HorizontalPositionAlign.RIGHT
                    },
                    verticalPosition: {
                      relative: VerticalPositionRelativeFrom.MARGIN,
                      align: VerticalPositionAlign.INSIDE
                    }
                  }
                })
              ]
            }),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              alignment: 'center',
              children: [
                new TextRun({
                  text: 'Template for Evidence(s)',
                  bold: true,
                  size: 36
                })
              ]
            }),
            new Paragraph({
              alignment: 'center',
              children: [
                new TextRun({
                  text: 'UI GreenMetric Questionnaire',
                  bold: true,
                  size: 36
                })
              ]
            }),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              children: [
                new TextRun(
                  'University:     Andres Bello Guayana Catholic University'
                )
              ]
            }),
            new Paragraph({
              children: [new TextRun('Country:     Venezuela')]
            }),
            new Paragraph({
              children: [
                new TextRun('Web Address:     http://guayanaweb.ucab.edu.ve/')
              ]
            }),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              children: [
                new TextRun({
                  text: '[' + index + ']' + indicatorName,
                  bold: true
                })
              ]
            }),
            new Paragraph({}),
            new Paragraph({
              children: [
                new TextRun({
                  text: '[' + index + '.' + subIndex + ']' + criterionName,
                  bold: true
                })
              ]
            }),
            new Paragraph({}),
            ...this.createEvidences(collections)
          ]
        }
      ]
    })

    const buffer = await Packer.toBuffer(doc)

    return buffer
  }
}
