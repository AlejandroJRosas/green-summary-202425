import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms'
import * as Yup from 'yup'

// Type alias for any object
export type AnyObject = Yup.AnyObject

// Type alias for form controls
export type FormControls<T> = { [P in keyof T]: FormControl<T[P]> }

/** Class that provides createGroup() and validate() static methods */
export class FormHandler {
  /** Generate form controls for the provided fields */
  static createGroup<T extends Yup.AnyObject>(
    formFields: T
  ): FormGroup<FormControls<T>> {
    const formControls: FormControls<T> = {} as FormControls<T>
    for (const [key, value] of Object.entries(formFields)) {
      formControls[key as keyof T] = new FormControl(value)
    }
    return new FormGroup(formControls)
  }

  /**
   * A function for validation with Yup schemas
   * @returns A function that validates a form group using the provided Yup schema
   * */
  static validate<T extends AnyObject>(
    schema: Yup.ObjectSchema<T>
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      if (!(group instanceof FormGroup)) {
        throw new Error(
          `AbstractControl ${group.constructor.name} must be an instance of FormGroup`
        )
      }

      try {
        schema.validateSync(group.value, { abortEarly: false })
        return null
      } catch (error: unknown) {
        if (!(error instanceof Yup.ValidationError)) throw error

        const errorObjects = error.inner
        let filteredErrors: Yup.ValidationError[] = []
        errorObjects.forEach((obj: Yup.ValidationError) => {
          const isExisting = filteredErrors.some((x) => obj.path === x.path)
          if (!isExisting) return filteredErrors.push(obj)

          filteredErrors = filteredErrors.map((item) => {
            if (item.path === obj.path) item.errors.push(obj.message)
            return item
          })
          return
        })

        const errors: ValidationErrors = {}
        filteredErrors.forEach((item: Yup.ValidationError) => {
          if (!item.path) return

          const formControl = group.get(item.path)

          if (formControl == null) {
            throw new Error(
              `Control ${item.path} not found in ${group.constructor.name}`
            )
          }

          formControl.setErrors({ yupErrors: item.errors })
          errors[item.path] = item.errors[0]
        })

        return errors
      }
    }
  }
}
