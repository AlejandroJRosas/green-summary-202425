import { Component, Inject, QueryList, ViewChildren } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { RecopilationService } from '../../services/recopilation.service'
import { Panel, PanelModule } from 'primeng/panel'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { Toast } from '../../common/toast/toast.component'
import { DialogModule } from 'primeng/dialog'
import { TooltipModule } from 'primeng/tooltip'
import { ScrollTopModule } from 'primeng/scrolltop'
import { RecopilationCardComponent } from './recopilation-card/recopilation-card.component'

@Component({
  selector: 'app-recopilation',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    ScrollTopModule,
    RecopilationCardComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './recopilation.component.html'
})
export class RecopilationComponent {
  @ViewChildren(Panel) panels: QueryList<Panel> | undefined

  allCollapsed: boolean = true

  //!DO NOT REMOVE THIS METHOD
  changed() {}

  collapseAll() {
    if (this.panels == null) return

    this.allCollapsed = true

    this.panels.forEach((panel) => {
      if (panel.collapsed) return

      panel.animating = true
      panel.collapse()
    })
  }

  expandAll() {
    if (this.panels == null) return

    this.allCollapsed = false

    this.panels.forEach((panel) => {
      if (!panel.collapsed) return

      panel.animating = true
      panel.expand()
    })
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router,
    private readonly recopilationService: RecopilationService
  ) {}

  recopilationsCategorized: RecopilationCategorized = {
    inCreation: [],
    onReview: [],
    upcoming: [],
    active: [],
    finished: []
  }
  showEmptyImage: boolean = true

  ngOnInit() {
    this.loadRecopilations()
  }

  showImage(): boolean {
    return (
      this.recopilationsCategorized.inCreation.length === 0 &&
      this.recopilationsCategorized.onReview.length === 0 &&
      this.recopilationsCategorized.active.length === 0 &&
      this.recopilationsCategorized.upcoming.length === 0 &&
      this.recopilationsCategorized.finished.length === 0
    )
  }

  handleRecopilationDeleted(isDeleting: boolean): void {
    if (isDeleting) {
      this.loadRecopilations()
    }
  }

  loadRecopilations() {
    this.recopilationsCategorized = {
      inCreation: [],
      onReview: [],
      upcoming: [],
      active: [],
      finished: []
    }
    this.recopilationService.getAll().subscribe({
      next: (recopilations) => {
        recopilations.forEach((recopilation) => {
          this.categorizeRecopilation(recopilation)
        })
        this.showEmptyImage = this.showImage()
      },
      error: () => {
        this.toast.show('error', 'Error', 'Error al cargar las recopilaciones')
      }
    })
  }

  categorizeRecopilation(recopilation: Recopilation): void {
    if (!recopilation.isReady) {
      this.recopilationsCategorized.inCreation.push(recopilation)
    } else if (
      new Date(recopilation.departmentEndDate).getTime() <
        new Date().getTime() &&
      new Date(recopilation.endDate).getTime() > new Date().getTime()
    ) {
      this.recopilationsCategorized.onReview.push(recopilation)
    } else if (
      new Date(recopilation.endDate).getTime() > new Date().getTime() &&
      new Date(recopilation.startDate).getTime() > new Date().getTime()
    ) {
      this.recopilationsCategorized.upcoming.push(recopilation)
    } else if (
      new Date(recopilation.endDate).getTime() < new Date().getTime()
    ) {
      this.recopilationsCategorized.finished.push(recopilation)
    } else {
      this.recopilationsCategorized.active.push(recopilation)
    }
  }

  navigateStepsCreate() {
    this.router.navigateByUrl(
      'pages/recopilations/steps-create/information-recopilation'
    )
  }
}

export type RecopilationCategorized = {
  inCreation: Recopilation[]
  onReview: Recopilation[]
  upcoming: Recopilation[]
  active: Recopilation[]
  finished: Recopilation[]
}
