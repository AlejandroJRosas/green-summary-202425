import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() isCollapsed = false
  @Input() screenWidth = 0

  getBodyClass(): string {
    let styleClass = ''
    if (this.isCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (
      this.isCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}
