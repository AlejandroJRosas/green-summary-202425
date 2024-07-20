import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
import { RecopilationService } from '../../../../../services/recopilation.service'

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
export class InformationRecopilationComponent
  extends ValidatedFormGroup<RecopilationFormControls>
  implements OnInit
{
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
    private route: ActivatedRoute,
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
      startDate: date()
        .required('La fecha de inicio de la recopilación es obligatoria')
        .test(
          'is-before-departmentEndDate',
          'La fecha de inicio debe ser menor que la fecha de finalización departamental de la recopilación',
          function (value) {
            const { departmentEndDate } = this.parent
            return (
              !value ||
              !departmentEndDate ||
              value.getTime() < new Date(departmentEndDate).getTime()
            )
          }
        )
        .test(
          'is-before-endDate',
          'La fecha de inicio debe ser menor que la fecha de finalización de la recopilación',
          function (value) {
            const { endDate } = this.parent
            return (
              !value ||
              !endDate ||
              value.getTime() < new Date(endDate).getTime()
            )
          }
        ),
      departmentEndDate: date()
        .required(
          'La fecha de finalización departamental de la recopilación es obligatoria'
        )
        .when('endDate', (endDate, schema) => {
          return schema
            .test({
              test: (departmentEndDate) =>
                !departmentEndDate ||
                !endDate ||
                departmentEndDate.getTime() <
                  new Date(endDate as unknown as Date).getTime(),
              message:
                'La fecha de finalización departamental no puede ser mayor que la fecha de finalización de la recopilación'
            })
            .when('startDate', (startDate, schema) => {
              return schema.test({
                test: (departmentEndDate) =>
                  !departmentEndDate ||
                  !startDate ||
                  departmentEndDate.getTime() >
                    new Date(startDate as unknown as Date).getTime(),
                message:
                  'La fecha de finalización departamental no puede ser menor que la fecha de inicio de la recopilación'
              })
            })
        }),
      endDate: date()
        .required('La fecha de finalización de la recopilación es obligatoria')
        .when('startDate', (startDate, schema) => {
          return schema
            .test({
              test: (endDate) =>
                !endDate ||
                !startDate ||
                endDate.getTime() >
                  new Date(startDate as unknown as Date).getTime(),
              message:
                'La fecha de finalización no puede ser menor que la fecha de inicio de la recopilación'
            })
            .when('departmentEndDate', (departmentEndDate, schema) => {
              return schema.test({
                test: (endDate) =>
                  !endDate ||
                  !departmentEndDate ||
                  endDate.getTime() >
                    new Date(departmentEndDate as unknown as Date).getTime(),
                message:
                  'La fecha de finalización no puede ser menor que la fecha de finalización departamental'
              })
            })
        })
    })

    super(initialControlValues, validationSchema)

    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId'], 10) || -1
    })
  }

  recopilationId: number = -1

  ngOnInit() {
    this.loadRecopilation()
  }

  loadRecopilation() {
    if (this.recopilationId !== -1) {
      this.recopilationService.getById(this.recopilationId).subscribe({
        next: (data) => {
          if (!data) return

          const recopilation = data
          this.formGroup.patchValue({
            name: recopilation.name,
            description: recopilation.description,
            startDate: new Date(recopilation.startDate),
            departmentEndDate: new Date(recopilation.departmentEndDate),
            endDate: new Date(recopilation.endDate)
          })
        },
        error: (e) => {
          if (e.error.data != null) {
            this.toast.show('error', 'Error', e.error.data.message)
          } else {
            this.toast.show('error', 'Error', e.error.message)
          }
        }
      })
    }
  }

  nextStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/select-departments/${this.recopilationId}`
    )
  }

  prevStep() {
    this.router.navigateByUrl('pages/recopilations')
  }

  submitAndContinueOrFail() {
    if (this.formGroup.invalid) {
      this.forceValidations()
      return
    }

    // We are sure that form control values are not null nor undefined 'cuz we only reach here if form group is valid, that's why we use '!'
    const newRecopilation: Omit<Recopilation, 'isReady'> & { id: number } = {
      id: this.recopilationId,
      name: this.formGroup.get('name')!.value!,
      description: this.formGroup.get('description')!.value!,
      startDate: this.formGroup.get('startDate')!.value!,
      departmentEndDate: this.formGroup.get('departmentEndDate')!.value!,
      endDate: this.formGroup.get('endDate')!.value!
    }

    this.recopilationService.create(newRecopilation).subscribe({
      next: (response) => {
        const recopilation = response.data as Recopilation & { id: number }
        const wasEdited = this.recopilationId !== -1
        this.recopilationId = recopilation.id
        this.toast.show(
          'success',
          'Éxito',
          wasEdited
            ? 'Recopilación editada correctamente'
            : 'Recopilación creada correctamente'
        )
        this.nextStep()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.data.message)
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

  public override errorsUpdate(
    field: Extract<keyof RecopilationFormControls, string>
  ) {
    if (!(field in this.errors)) {
      throw new Error(
        `Field ${field.toString()} not found in ${this.constructor.name}`
      )
    }

    super.errorsUpdate(field)

    for (const controlName in this.formGroup.controls) {
      if (
        controlName in this.errors &&
        this.formGroup.controls[controlName as keyof RecopilationFormControls]
          .dirty
      ) {
        super.errorsUpdate(controlName as keyof RecopilationFormControls)
        this.formGroup.controls[
          controlName as keyof RecopilationFormControls
        ].updateValueAndValidity()
      }
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
