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
    private readonly recopilationService: RecopilationService,
    private readonly confirmationService: ConfirmationService
  ) {}

  inCreationRecopilations: Array<Recopilation & { isReady: boolean }> = []
  onReviewRecopilations: Array<Recopilation & { isReady: boolean }> = []
  upcomingRecopilations: Array<Recopilation & { isReady: boolean }> = []
  activeRecopilations: Array<Recopilation & { isReady: boolean }> = []
  finishedRecopilations: Array<Recopilation & { isReady: boolean }> = []

  ngOnInit() {
    this.loadRecopilations()
  }

  private loadRecopilations() {
    this.recopilationService.getAll().subscribe((recopilations) => {
      recopilations.forEach((recopilation) => {
        if (!recopilation.isReady) {
          this.inCreationRecopilations.push(recopilation)
        } else if (
          new Date(recopilation.departmentEndDate).getTime() <
            new Date().getTime() &&
          new Date(recopilation.endDate).getTime() > new Date().getTime()
        ) {
          this.onReviewRecopilations.push(recopilation)
        } else if (
          new Date(recopilation.endDate).getTime() > new Date().getTime() &&
          new Date(recopilation.startDate).getTime() > new Date().getTime()
        ) {
          this.upcomingRecopilations.push(recopilation)
        } else if (
          new Date(recopilation.endDate).getTime() < new Date().getTime()
        ) {
          this.finishedRecopilations.push(recopilation)
        } else {
          this.activeRecopilations.push(recopilation)
        }
      })
    })
  }
}
