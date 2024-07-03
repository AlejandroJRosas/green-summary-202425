class Base<T> {
  value: T | undefined
  key: string
  label: string
  required: boolean
  order: number
  type: string
  controlType: string
  options: { key: string; value: string }[]

  constructor(
    options: {
      value?: T
      key?: string
      label?: string
      required?: boolean
      order?: number
      type?: string
      controlType?: string
      options?: { key: string; value: string }[]
    } = {}
  ) {
    this.value = options.value
    this.key = options.key || ''
    this.label = options.label || ''
    this.required = !!options.required
    this.order = options.order === undefined ? 1 : options.order
    this.type = options.type || ''
    this.controlType = options.controlType || ''
    this.options = options.options || []
  }
}

export class IndicatorCheckbox extends Base<boolean> {
  override controlType = 'checkbox'
}

export class CriterionCheckbox extends Base<boolean> {
  override controlType = 'checkbox'
}

export class CategorySelect extends Base<string> {
  override controlType = 'select'
}
