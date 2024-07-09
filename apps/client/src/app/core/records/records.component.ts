import { Component, OnInit } from '@angular/core'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { CardModule } from 'primeng/card'
import { AccordionModule } from 'primeng/accordion'
import { RouterLink, Router } from '@angular/router'
import { RecopilationService } from '../../services/recopilation.service'
import {
  CategoryByRecopilation,
  IndicatorByRecopilation,
  IndicatorService
} from '../../services/indicator.service'
import { type Recopilation } from '../../../shared/types/recopilation.type'
import { type Indicator } from '../../../shared/types/indicator.type'
import { RecordsGenericCardComponent } from './generic-card/generic-card.component'
import { RecordsCategoryComponent } from './category/category.component'

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CardModule,
    RouterLink,
    AccordionModule,
    RecordsGenericCardComponent,
    RecordsCategoryComponent
  ],
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  public recopilation: Recopilation | undefined

  public recopilations: Recopilation[] | undefined

  public indicator: Indicator | undefined

  public indicators: Indicator[] | undefined

  public categoriesAndCriteria: CategoryByRecopilation[] | undefined

  private indicatorsByRecopilation: IndicatorByRecopilation[] | undefined

  constructor(
    private router: Router,
    private recopilationService: RecopilationService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.initializeRecopilations()
  }

  updateIndicators(): void {
    if (this.recopilation == null) return

    this.indicatorService
      .getByRecopilation(this.recopilation.id)
      .subscribe((indicatorsByRecopilation) => {
        this.indicatorsByRecopilation = indicatorsByRecopilation

        this.indicators = this.indicatorsByRecopilation.map((i) => ({
          index: i.index,
          alias: i.alias,
          helpText: i.helpText,
          name: i.name
        }))
      })
  }

  updateCategoriesAndCriteria(): void {
    if (this.indicatorsByRecopilation == null) return
    if (this.indicator == null) return

    this.categoriesAndCriteria = this.indicatorsByRecopilation.find(
      (i) => i.index === this.indicator!.index
    )?.categories
  }

  goToCategoryRecord(categoryId: number): void {
    this.router.navigateByUrl(`/pages/records/category/${categoryId}`)
  }

  private initializeRecopilations(): void {
    this.recopilationService.getActive().subscribe((recopilations) => {
      this.recopilations = recopilations
    })
  }
}
