import { Component, Input, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { WordGenerationModalComponent } from './word-generation-modal/word-generation-modal.component'
import {
  DepartmentAnswer,
  InformationCollectionService
} from '../../../services/information-collection.service'
import { Criteria } from '../../../../shared/types/criterion.type'

@Component({
  selector: 'app-records-category',
  standalone: true,
  imports: [ButtonModule, PanelModule, WordGenerationModalComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class RecordsCategoryComponent implements OnInit {
  @Input() public criteria: Array<Omit<Criteria, 'indicator'>> | undefined

  @Input() public recopilationId: number | undefined

  @Input() public categoryId: number | undefined

  public modalVisible: boolean = false

  public departmentAnswers: DepartmentAnswer[] | undefined

  constructor(
    private informationCollectionService: InformationCollectionService
  ) {}

  ngOnInit(): void {
    if (this.recopilationId == null || this.categoryId == null) return

    this.informationCollectionService
      .getByRecopilationAndCategory(this.recopilationId, this.categoryId)
      .subscribe((departmentAnswers) => {
        this.departmentAnswers = departmentAnswers
      })
  }
}
