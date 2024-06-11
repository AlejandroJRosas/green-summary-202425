import { Component, EventEmitter, Output } from '@angular/core'
import { navbarData } from './nav-data'
import { RouterLink, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

export interface SideNavToggle {
  screenWidth: number
  isCollapsed: boolean
}

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter()
  isCollapsed = false
  screenWidth = 0
  navData = navbarData

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth
    })
  }
  closeSidenav() {
    this.isCollapsed = false
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth
    })
  }
}
