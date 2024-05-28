import { Component, Inject } from '@angular/core'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { Severity } from './severity.types'

@Component({
  selector: 'toast',
  template: `<p-toast />`,
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule]
})
export class Toast {
  constructor(@Inject(MessageService) private messageService: MessageService) {}

  show(type: Severity, title: string, message: string) {
    console.log('me estan tocando')
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      life: 3000
    })
  }
}
