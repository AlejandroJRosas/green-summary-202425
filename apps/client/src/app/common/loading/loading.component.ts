import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class Loading {
  isLoading = false

  setIsLoading(bool: boolean) {
    this.isLoading = bool
  }

  getIsLoadingClass() {
    let styleClass = ''
    if (this.isLoading) {
      styleClass = ''
    } else {
      styleClass = 'hidden'
    }

    return styleClass
  }
}
