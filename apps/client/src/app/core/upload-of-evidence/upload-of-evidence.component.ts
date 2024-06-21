import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CategoryService } from '../../services/category.service'
import { Router } from '@angular/router'
import { CollectionOfInformationComponent } from './collection-of-information/collection-of-information.component'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-upload-of-evidence',
  standalone: true,
  imports: [
    ButtonModule,
    CollectionOfInformationComponent,
    ProgressSpinnerModule
  ],
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
  indicatorName: string = ''
  categoryName: string = ''
  fetchCategoryById = false
  ngOnInit() {
    this.getCategoryById()
  }
  getCategoryById() {
    this.fetchCategoryById = true
    this.categoryService.getById(this.categoryId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.indicatorName = res.data.indicator.alias
          this.categoryName = res.data.name
          this.fetchCategoryById = false
        }
      },
      error: (e) => {
        console.error(e)
        this.fetchCategoryById = false
        // this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
}
