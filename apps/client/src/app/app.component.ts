import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { Toast } from './common/toast/toast.component'
import { LoadingComponent } from './common/loading/loading.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Toast, LoadingComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Green Summary'
}
