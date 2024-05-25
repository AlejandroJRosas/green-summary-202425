import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'

import { routes } from './app.routes'
import { Toast } from './common/toast/toast.component'
import { MessageService } from 'primeng/api'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), Toast, MessageService]
}
