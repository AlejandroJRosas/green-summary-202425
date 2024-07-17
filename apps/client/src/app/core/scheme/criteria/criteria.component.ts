import { Component, Inject, Input } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { RadioButtonModule } from 'primeng/radiobutton'
import { string, object, number, boolean } from 'yup'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import {
  CriteriaDTO,
  CriteriaService
} from '../../../services/criteria.service'
import { Criteria } from '../../../../shared/types/criterion.type'
import { PanelModule } from 'primeng/panel'
import { ConfirmationService } from 'primeng/api'
import { Toast } from '../../../common/toast/toast.component'
import { VALUES } from '../../../../../../../shared/validations'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'criteria',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    PanelModule,
    TooltipModule
  ],
  templateUrl: './criteria.component.html'
})
export class CriteriaComponent extends ValidatedFormGroup<formPayload> {
  constructor(
    @Inject(Toast) private toast: Toast,
    private confirmationService: ConfirmationService,
    private criteriaService: CriteriaService
  ) {
    const initialControlValues = {
      subIndex: 1,
      name: '',
      alias: '',
      requiresEvidence: true,
      helpText: ''
    }

    const validationSchema = object({
      subIndex: number()
        .min(1, 'El subindice debe ser mayor o igual a 1')
        .required('El subíndice es requerido'),
      name: string()
        .required('El nombre es requerido')
        .max(
          VALUES.criterionNameAliasMaxAmount,
          'El nombre no puede superar los 80 caracteres'
        )
        .min(
          VALUES.nameAliasMinAmount,
          'El nombre debe superar un mínimo de 10 caracteres'
        ),
      alias: string()
        .required('El alias es requerido')
        .max(
          VALUES.criterionNameAliasMaxAmount,
          'El alias no puede superar los 80 caracteres'
        )
        .min(
          VALUES.nameAliasMinAmount,
          'El alias debe superar un mínimo de 10 caracteres'
        ),
      requiresEvidence: boolean().required('La evidencia es requerida'),
      helpText: string()
        .required('El texto de ayuda es requerido')
        .max(
          VALUES.helpTextMaxAmount,
          'El texto de ayuda no puede superar los 128 caracteres'
        )
        .min(
          VALUES.helpTextMinAmount,
          'El texto de ayuda debe superar un mínimo de 1 caracter'
        )
    })
    super(initialControlValues, validationSchema)
  }
  errors = {
    subIndex: '',
    name: '',
    alias: '',
    requiresEvidence: '',
    helpText: ''
  }
  @Input() criterion: Criteria[] = []
  @Input() indicatorIndex: number = 0
  visibleCreate = false
  visibleEdit = false
  fetchCreateCriterion: boolean = false
  fetchEditCriterion: boolean = false
  criteriaEdit: formPayloadEdit = {
    id: 0,
    subIndex: 0,
    name: '',
    alias: '',
    requiresEvidence: false,
    helpText: ''
  }
  reset() {
    this.formGroup.reset()
    this.errors = {
      subIndex: '',
      name: '',
      alias: '',
      requiresEvidence: '',
      helpText: ''
    }
  }
  closeDialog() {
    this.visibleCreate = false
    this.visibleEdit = false
    this.reset()
    this.formGroup.controls.subIndex.setValue(1)
    this.formGroup.controls.requiresEvidence.setValue(true)
  }
  showDialogEdit(criteria: Criteria) {
    this.visibleEdit = true
    this.criteriaEdit = criteria
    this.formGroup.controls.subIndex.setValue(this.criteriaEdit.subIndex)
    this.formGroup.controls.name.setValue(this.criteriaEdit.name)
    this.formGroup.controls.alias.setValue(this.criteriaEdit.alias)
    this.formGroup.controls.requiresEvidence.setValue(
      this.criteriaEdit.requiresEvidence
    )
    this.formGroup.controls.helpText.setValue(this.criteriaEdit.helpText)
  }
  confirmationDelete(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el criterio <strong>${name}</strong>?`,
      header: 'Eliminar criterio',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('info', 'Eliminando..', 'Eliminando criterio..')
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }
  getCriterionPerIndicator(indicatorId: number) {
    this.criteriaService
      .getAllCriterionByIndicatorIndex(indicatorId)
      .subscribe({
        next: (res) => {
          this.criterion = res.status === 'success' ? res.data : this.criterion
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
  onDelete(id: number) {
    this.criteriaService.delete(id).subscribe({
      next: () => {
        this.toast.show('success', 'Eliminado', 'Criterio eliminado con éxito')
        this.getCriterionPerIndicator(this.indicatorIndex)
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
  onCreate() {
    if (this.formGroup.invalid) return
    this.fetchCreateCriterion = true
    const { subIndex, name, alias, requiresEvidence, helpText } =
      this.formGroup.controls
    const criteria: CriteriaDTO = {
      indicatorIndex: this.indicatorIndex,
      subIndex: subIndex.value,
      name: name.value,
      alias: alias.value,
      requiresEvidence: requiresEvidence.value,
      helpText: helpText.value
    }
    this.visibleCreate = false
    this.criteriaService.create(criteria).subscribe({
      next: () => {
        this.fetchCreateCriterion = false
        this.toast.show('success', 'Creado', 'Criterio creado con éxito')
        this.closeDialog()
        this.getCriterionPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.fetchCreateCriterion = false
        this.visibleCreate = false
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
        this.closeDialog()
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    this.fetchEditCriterion = true
    const { subIndex, name, alias, requiresEvidence, helpText } =
      this.formGroup.controls
    const criteria: CriteriaDTO = {
      indicatorIndex: this.indicatorIndex,
      subIndex: subIndex.value,
      name: name.value,
      alias: alias.value,
      helpText: helpText.value,
      requiresEvidence: requiresEvidence.value
    }
    this.visibleEdit = false
    this.criteriaService.edit(this.criteriaEdit.id, criteria).subscribe({
      next: () => {
        this.fetchEditCriterion = false
        this.toast.show('success', 'Creado', 'Criterio editado con éxito')
        this.closeDialog()
        this.getCriterionPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.visibleEdit = false
        this.fetchEditCriterion = false
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
        this.closeDialog()
      }
    })
  }
}

type formPayload = Omit<CriteriaDTO, 'indicatorIndex'>
type formPayloadEdit = Omit<Criteria, 'indicator'>
