import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loadingService = inject(LoadingService)
}
