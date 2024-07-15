import { Component } from '@angular/core'
import { SideNavToggle, SidenavComponent } from '../sidenav/sidenav.component'
import { BodyComponent } from '../body/body.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, BodyComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  isCollapsed = false
  screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.isCollapsed = data.isCollapsed
    this.screenWidth = data.screenWidth
  }
}
