import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TooltipModule } from 'primeng/tooltip'
import { ValidatedFormGroup } from '../../../../../common/validated-form-group/validated-form-group'
import { Recopilation } from '../../../../../../shared/types/recopilation.type'
import { date, object, string } from 'yup'
import { ReactiveFormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'
import { RecopilationService } from '../../../../../services/recopilaton.service'

@Component({
  selector: 'app-information-recopilation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    TooltipModule,
    Toast
  ],
  templateUrl: './information-recopilation.component.html'
})
export class InformationRecopilationComponent extends ValidatedFormGroup<RecopilationFormControls> {
  errors = {
    name: '',
    description: '',
    startDate: '',
    departmentEndDate: '',
    endDate: ''
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private recopilationService: RecopilationService,
    private router: Router
  ) {
    const initialControlValues = {
      name: '',
      description: '',
      startDate: undefined,
      departmentEndDate: undefined,
      endDate: undefined
    }

    const validationSchema = object({
      name: string().required('El nombre de la recopilación es obligatorio'),
      description: string().required(
        'La descripción de la recopilación es obligatoria'
      ),
      startDate: date().required(
        'La fecha de inicio de la recopilación es obligatoria'
      ),
      departmentEndDate: date().required(
        'La fecha de finalización departamental de la recopilación es obligatoria'
      ),
      endDate: date().required(
        'La fecha de finalización de la recopilación es obligatoria'
      )
    })

    super(initialControlValues, validationSchema)
  }

  nextStep() {
    this.router.navigateByUrl('recopilations/steps-create/select-departments')
  }

  prevStep() {
    this.router.navigateByUrl('recopilations')
  }

  submitAndContinueOrFail() {
    if (this.formGroup.invalid) {
      this.forceValidations()
      return
    }

    // We are sure that form control values are not null nor undefined 'cuz we only reach here if form group is valid, that's why we use '!'
    const newRecopilation: Recopilation = {
      name: this.formGroup.get('name')!.value!,
      description: this.formGroup.get('description')!.value!,
      startDate: this.formGroup.get('startDate')!.value!,
      departmentEndDate: this.formGroup.get('departmentEndDate')!.value!,
      endDate: this.formGroup.get('endDate')!.value!
    }

    this.recopilationService.create(newRecopilation).subscribe({
      next: () => {
        this.toast.show('success', 'Éxito', 'Recopilación creada correctamente')
        this.nextStep()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  forceValidations() {
    this.formGroup.markAllAsTouched()
    this.formGroup.markAsDirty()

    for (const controlName in this.formGroup.controls) {
      const control = this.formGroup.get(controlName)
      if (control == null) {
        return
      }

      control.markAsDirty()
      this.errorsUpdate(controlName as keyof RecopilationFormControls)
    }
  }
}

// type RecopilationFormControls = Pick<Recopilation, 'name' | 'description'> &
//   Partial<Omit<Recopilation, 'name' | 'description'>>

type RecopilationFormControls = {
  name: string
  description: string
  startDate: Date | undefined
  departmentEndDate: Date | undefined
  endDate: Date | undefined
}
