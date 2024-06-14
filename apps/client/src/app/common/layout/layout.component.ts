import { Component } from '@angular/core'
import { SideNavToggle, SidenavComponent } from '../sidenav/sidenav.component'
import { BodyComponent } from '../body/body.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, BodyComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSideNavCollapsed = false
  screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.isSideNavCollapsed = data.isCollapsed
    this.screenWidth = data.screenWidth
  }
}
