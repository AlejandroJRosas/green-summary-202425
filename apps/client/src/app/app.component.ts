import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Toast } from './common/toast/toast.component'
import { LayoutComponent } from './common/layout/layout.component'
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Toast, LayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Green Summary'
  currentPath: string

  constructor(private location: Location) {
    this.currentPath = this.location.path()
  }
}
