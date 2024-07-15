import { Component, Input, OnInit } from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import {
  DepartmentAnswer,
  InformationCollectionService
} from '../../../../services/information-collection.service'
import { Criteria } from '../../../../../shared/types/criterion.type'
import { Category } from '../../../../../shared/types/category.type'

@Component({
  selector: 'app-records-category-body',
  standalone: true,
  imports: [PanelModule, ImageModule, DividerModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class RecordsCategoryBodyComponent implements OnInit {
  @Input() public criteria: Array<Omit<Criteria, 'indicator'>> | undefined

  @Input() public recopilationId: number | undefined

  @Input() public category: Omit<Category, 'indicator'> | undefined

  public modalVisible: boolean = false

  public departmentAnswers: DepartmentAnswer[] | undefined

  constructor(
    private informationCollectionService: InformationCollectionService
  ) {}

  ngOnInit(): void {
    if (this.recopilationId == null || this.category?.id == null) return

    this.informationCollectionService
      .getByRecopilationAndCategoryFilterNoErrors(
        this.recopilationId,
        this.category.id
      )
      .subscribe((departmentAnswers) => {
        this.departmentAnswers = departmentAnswers
      })
  }

  translateType(type: string) {
    switch (type) {
      case 'image':
        return 'Imagen'
      case 'document':
        return 'Documento'
      default:
        return 'Link'
    }
  }
}
