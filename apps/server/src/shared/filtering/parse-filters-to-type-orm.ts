import {
  Equal,
  Not,
  MoreThanOrEqual,
  LessThanOrEqual,
  MoreThan,
  LessThan,
  ILike,
  FindOperator,
  IsNull
} from 'typeorm'
import { Filter } from './filter.type'
import { DELIMITERS, OPERATORS } from './constants'

export function parseFiltersToTypeOrm(filters: Filter[]) {
  const whereConditionsBlocks: Record<string, FindOperator<unknown>>[] = []

  let currentConditionBlock: Record<string, FindOperator<unknown>> = {}
  let currentCondition: FindOperator<unknown> | undefined = undefined

  filters.forEach((filter) => {
    const { field, operator, value, delimiter } = filter

    switch (operator) {
      case OPERATORS.EQUAL:
        if (value === '') currentCondition = IsNull()
        else currentCondition = Equal(value)
        break
      case OPERATORS.NOT_EQUAL:
        if (value === '') currentCondition = Not(IsNull())
        else currentCondition = Not(value)
        break
      case OPERATORS.GREATER_OR_EQUAL:
        currentCondition = MoreThanOrEqual(value)
        break
      case OPERATORS.LESS_OR_EQUAL:
        currentCondition = LessThanOrEqual(value)
        break
      case OPERATORS.GREATER:
        currentCondition = MoreThan(value)
        break
      case OPERATORS.LESS:
        currentCondition = LessThan(value)
        break
      case OPERATORS.CONTAINS:
        currentCondition = ILike(`%${value}%`)
        break
      case OPERATORS.DOES_NOT_CONTAIN:
        currentCondition = Not(ILike(`%${value}%`))
        break
      case OPERATORS.STARTS_WITH:
        currentCondition = ILike(`${value}%`)
        break
      case OPERATORS.ENDS_WITH:
        currentCondition = ILike(`%${value}`)
        break
      default:
        break
    }

    if (delimiter === DELIMITERS.OR) {
      whereConditionsBlocks.push(currentConditionBlock)
      currentConditionBlock = {}
    } else {
      currentConditionBlock[field] = currentCondition
    }
  })

  if (Object.keys(currentConditionBlock).length) {
    whereConditionsBlocks.push(currentConditionBlock)
  }

  return whereConditionsBlocks
}
