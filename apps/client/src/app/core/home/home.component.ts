import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'
import {
  MatrixInfoDto,
  RecopilationService
} from '../../services/recopilation.service'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { TooltipIcon } from '../../common/tooltip-icon/tooltip-icon.component'
import { TooltipModule } from 'primeng/tooltip'
import { RouterLink } from '@angular/router'
import { matrix } from './test-data'
import { MatrixComponent } from './matrix/matrix.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    TableModule,
    TooltipIcon,
    TooltipModule,
    RouterLink,
    MatrixComponent,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private recopilationService: RecopilationService) {}

  recopilations: Recopilation[] = []
  selectedRecopilation: number = 0
  matrixData: MatrixInfoDto | null = matrix
  dialogVisible: boolean = false
  dialogMatrixScrollHeight: string = 'calc(70vh - 1rem)'

  ngOnInit(): void {
    this.getActiveRecopilations()
    this.selectedRecopilation = 23
  }

  getActiveRecopilations() {
    this.recopilationService.getActive().subscribe({
      next: (recopilations) => {
        if (recopilations.status === 'success') {
          this.recopilations = recopilations.data
          console.log(recopilations.data)
        }
      }
    })
  }

  getMatrixData() {
    if (this.selectedRecopilation) {
      this.recopilationService
        .getMatrixInfo(this.selectedRecopilation)
        .subscribe({
          next: (recopilation) => {
            if (recopilation) {
              this.matrixData = recopilation
            }
            console.log(this.matrixData)
          },
          error: (error) => {
            console.error(error)
          }
        })
    }
  }

  showDialog() {
    this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    this.dialogVisible = true
  }

  onMaximize() {
    if (this.dialogMatrixScrollHeight === 'calc(80vh - 1rem)') {
      this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    } else {
      this.dialogMatrixScrollHeight = 'calc(80vh - 1rem)'
    }
  }
}
