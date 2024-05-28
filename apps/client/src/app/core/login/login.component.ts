/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { FloatLabelModule } from 'primeng/floatlabel'
import { CheckboxModule } from 'primeng/checkbox'
import { Toast } from '../../common/toast/toast.component'
import { LottieComponent, AnimationOptions } from 'ngx-lottie'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  animations: [],
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    CheckboxModule,
    LottieComponent,
    Toast
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginPayload: LoginPayload

  constructor(
    @Inject(Toast) private toast: Toast,
    private authService: AuthService
  ) {
    this.loginPayload = new LoginPayload()
  }

  options: AnimationOptions = {
    path: '/assets/home-img.json'
  }

  onLogin() {
    this.authService.login(this.loginPayload).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('token', res.data.token)
        this.toast.show(
          'success',
          'Éxito',
          'Usted ha iniciado sesión correctamente'
        )
      },
      error: (error) => {
        this.toast.show('error', 'Error', error.message)
      }
    })
  }
}

export class LoginPayload {
  email: string
  password: string

  constructor() {
    this.email = ''
    this.password = ''
  }
}
