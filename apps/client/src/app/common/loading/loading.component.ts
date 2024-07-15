import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor() {}
  loadingService = inject(LoadingService)
}
