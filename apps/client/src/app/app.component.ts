import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Toast } from './common/toast/toast.component'
import {
  SideNavToggle,
  SidenavComponent
} from './common/sidenav/sidenav.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Toast, SidenavComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Green Summary'

  isSideNavCollapsed = false
  screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.isSideNavCollapsed = data.isCollapsed
    this.screenWidth = data.screenWidth
  }
}
