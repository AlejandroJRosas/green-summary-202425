import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Toast } from './common/toast/toast.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Toast],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'client'
}
