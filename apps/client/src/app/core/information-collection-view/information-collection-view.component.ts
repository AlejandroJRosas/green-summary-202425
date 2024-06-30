import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  InformationCollectionByDepartment,
  InformationCollectionService
} from '../../services/information-collection.service'
import { Toast } from '../../common/toast/toast.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { ImageModule } from 'primeng/image'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { PanelModule } from 'primeng/panel'
import { Category } from '../../../shared/types/category.type'
import { Indicator } from '../../../shared/types/indicator.type'
import { CategoryService } from '../../services/category.service'
import { DepartmentService } from '../../services/department.service'
import { User } from '../../../shared/types/user.type'

@Component({
  selector: 'app-information-collection-view',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ImageModule,
    DividerModule
  ],
  templateUrl: './information-collection-view.component.html',
  styles: ``
})
export class InformationCollectionViewComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private route: ActivatedRoute,
    private InformationCollectionService: InformationCollectionService,
    private CategoryService: CategoryService,
    private router: Router,
    private DepartmentService: DepartmentService
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
      this.departmentId = parseInt(params['departmentId'], 10)
    })
  }
  recopilationId: number = 0
  categoryId: number = 0
  departmentId: number = 0
  informationCollections: InformationCollectionByDepartment[] = []
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
  department: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    type: 'department'
  }
  ngOnInit() {
    this.getDepartmentById()
    this.getCategoryById()
    this.getAllByDepartment()
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
  getDepartmentById() {
    this.DepartmentService.getById(this.departmentId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.department = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  getCategoryById() {
    this.CategoryService.getById(this.categoryId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.category = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  getAllByDepartment() {
    this.InformationCollectionService.getByDepartmentId(
      this.recopilationId,
      this.categoryId,
      this.departmentId
    ).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.informationCollections = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
}
