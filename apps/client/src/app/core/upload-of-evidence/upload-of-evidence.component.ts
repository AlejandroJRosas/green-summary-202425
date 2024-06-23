import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CategoryService } from '../../services/category.service'
import { Router } from '@angular/router'
import { CollectionOfInformationComponent } from './collection-of-information/collection-of-information.component'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { Indicator } from '../../../shared/types/indicator.type'
import { Category } from '../../../shared/types/category.type'

@Component({
  selector: 'app-upload-of-evidence',
  standalone: true,
  imports: [
    ButtonModule,
    CollectionOfInformationComponent,
    ProgressSpinnerModule
  ],
  providers: [ConfirmationService],
  templateUrl: './upload-of-evidence.html',
  styles: ``
})
export class UploadOfEvidenceComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  recopilationId: number = 0
  categoryId: number = 0
  indicator: Indicator = {
    index: 0,
    alias: '',
    helpText: '',
    name: ''
  }
  category: Category = {
    name: '',
    helpText: '',
    id: 0,
    indicator: this.indicator
  }
  fetchCategoryById = false
  ngOnInit() {
    this.getCategoryById()
  }
  getCategoryById() {
    this.fetchCategoryById = true
    this.categoryService.getById(this.categoryId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.category = res.data
          this.fetchCategoryById = false
        }
      },
      error: (e) => {
        console.error(e)
        this.fetchCategoryById = false
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
}
