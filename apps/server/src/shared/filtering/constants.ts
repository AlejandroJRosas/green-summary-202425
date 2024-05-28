export const DELIMITERS = {
  AND: ';',
  OR: ','
} as const
export const OPERATORS = {
  EQUAL: '==',
  NOT_EQUAL: '!=',
  GREATER_OR_EQUAL: '>=',
  LESS_OR_EQUAL: '<=',
  GREATER: '>',
  LESS: '<',
  CONTAINS: '=@',
  DOES_NOT_CONTAIN: '!@',
  STARTS_WITH: '=^',
  ENDS_WITH: '=$'
} as const

export const matchOperatorRegexp = /==|!=|>=|<=|>|<|=@|!@|=\^|=\$/
export const matchDelimiterRegexp = /;|,/

export type Delimiter = (typeof DELIMITERS)[keyof typeof DELIMITERS]
export type Operator = (typeof OPERATORS)[keyof typeof OPERATORS]
