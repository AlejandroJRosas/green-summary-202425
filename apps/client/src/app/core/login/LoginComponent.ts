import { Component, Inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { FloatLabelModule } from 'primeng/floatlabel'
import { CheckboxModule } from 'primeng/checkbox'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BaseUrl } from '../../../config'
import { Toast } from '../../common/toast/toast.component'
import { LottieComponent, AnimationOptions } from 'ngx-lottie'
import { LoginPayload } from './login.component'

@Component({
  selector: 'app-login',
  standalone: true,
  animations: [],
  imports: [
    FormsModule,
    HttpClientModule,
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
    private http: HttpClient,
    @Inject(Toast) private toast: Toast
  ) {
    this.loginPayload = new LoginPayload()
  }

  options: AnimationOptions = {
    path: '/assets/home-img.json'
  }

  onLogin() {
    this.http.post(`${BaseUrl}/auth/login`, this.loginPayload).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', res.data.user)
        localStorage.setItem('token', res.data.token)
        this.toast.show(
          'success',
          'Éxito',
          'Usted ha iniciado sesión correctamente'
        )
      },
      error: (error) => {
        this.toast.show(
          'error',
          'Error',
          'Correo electrónico o contraseña incorrecto'
        )
        console.log(error)
      }
    })
  }
}
