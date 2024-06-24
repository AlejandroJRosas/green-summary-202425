import { Component } from '@angular/core'
import { SideNavToggle, SidenavComponent } from '../sidenav/sidenav.component'
import { BodyComponent } from '../body/body.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SidenavComponent, BodyComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isCollapsed = false
  screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.isCollapsed = data.isCollapsed
    this.screenWidth = data.screenWidth
  }

  getSidenavClass() {
    let styleClass = ''
    if (this.isCollapsed && this.screenWidth > 768) {
      styleClass = ''
    }
    if (this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'sidenav-md-screen'
    }
    return styleClass
  }

  getBodyClass() {
    let styleClass = ''
    if (this.isCollapsed && this.screenWidth > 768) {
      styleClass = ''
    }
    if (this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}
