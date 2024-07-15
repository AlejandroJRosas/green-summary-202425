import { Component, Input, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { WordGenerationModalComponent } from '../word-generation-modal/word-generation-modal.component'
import {
  DepartmentAnswer,
  InformationCollectionService
} from '../../../../services/information-collection.service'
import { Criteria } from '../../../../../shared/types/criterion.type'
import { Category } from '../../../../../shared/types/category.type'

@Component({
  selector: 'app-records-category-header',
  standalone: true,
  imports: [ButtonModule, WordGenerationModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class RecordsCategoryHeaderComponent implements OnInit {
  @Input() public criteria: Array<Omit<Criteria, 'indicator'>> | undefined

  @Input() public recopilationId: number | undefined

  @Input() public category: Omit<Category, 'indicator'> | undefined

  public modalVisible: boolean = false

  public departmentAnswers: DepartmentAnswer[] | undefined = []

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
}
