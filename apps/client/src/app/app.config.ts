import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideLottieOptions } from 'ngx-lottie'
import player from 'lottie-web'

import { routes } from './app.routes'
import { Toast } from './common/toast/toast.component'
import { MessageService } from 'primeng/api'
import { provideHttpClient } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideLottieOptions({
      player: () => player
    }),
    Toast,
    MessageService,
    provideHttpClient()
  ]
}
