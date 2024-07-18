import { Component, Inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { FloatLabelModule } from 'primeng/floatlabel'
import { CheckboxModule } from 'primeng/checkbox'
import { Toast } from '../../common/toast/toast.component'
import { AuthResponse, AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import * as Yup from 'yup'
import { ValidatedFormGroup } from '../../common/validated-form-group/validated-form-group'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'

@Component({
  selector: 'app-login',
  standalone: true,
  animations: [],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    CheckboxModule,
    Toast,
    LottieComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent extends ValidatedFormGroup<ILoginComponent> {
  options: AnimationOptions = {
    path: '/assets/animations/login.json'
  }

  errors = {
    email: '',
    password: ''
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private authService: AuthService,
    private router: Router
  ) {
    const initialControlValues = {
      email: '',
      password: ''
    }

    const validationSchema = Yup.object({
      email: Yup.string()
        .required('El correo electrónico es requerido')
        .email('El correo electrónico no tiene un formato válido'),
      password: Yup.string().required('La contraseña es requerida')
    })

    super(initialControlValues, validationSchema)
  }

  onLogin() {
    if (this.formGroup.invalid) {
      return
    }

    const {
      email: { value: email },
      password: { value: password }
    } = this.formGroup.controls

    this.authService.login({ email, password }).subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('token', res.data.token)
        this.toast.show(
          'success',
          'Éxito',
          'Usted ha iniciado sesión correctamente'
        )
        this.router.navigate(['/pages/home'])
      },
      error: () => {
        this.toast.show('error', 'Error', 'Email o contraseña incorrecta')
      }
    })
  }
}

interface ILoginComponent {
  email: string
  password: string
}
