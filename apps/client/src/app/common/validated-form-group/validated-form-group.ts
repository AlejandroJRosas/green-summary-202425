import { ObjectSchema } from 'yup'
import { FormGroup } from '@angular/forms'
import {
  AnyObject,
  FormControls,
  FormHandler
} from '../../../utils/form-handler'

export abstract class ValidatedFormGroup<T extends AnyObject> {
  public formGroup: FormGroup<FormControls<T>>
  public abstract errors: { [key in keyof T]: string }

  /**
   * Updates the given field in this.errors only if that field's control is touched and dirty
   * @param field Field in this.errors to update
   */
  public errorsUpdate(field: Extract<keyof T, string>) {
    if (!(field in this.errors)) {
      throw new Error(
        `Field ${field.toString()} not found in ${this.constructor.name}`
      )
    }

    this.errors[field] = this.controlErrors(field)
  }

  private controlErrors(controlName: string): string {
    const control = this.formGroup.get(controlName)

    if (control == null) {
      throw new Error(
        `Control ${controlName} not found in ${this.constructor.name}`
      )
    }

    if (control.untouched || control.pristine || this.formGroup.errors == null)
      return ''

    return this.formGroup.errors[controlName] as string
  }

  constructor(initialControlsValues: T, validationSchema: ObjectSchema<T>) {
    this.formGroup = FormHandler.createGroup(initialControlsValues)
    this.formGroup.setValidators(FormHandler.validate(validationSchema))
  }
}
