import { matchOperatorRegexp, matchDelimiterRegexp } from './constants'
import { Filter } from './filter.type'

export function parseFiltersSegment(segment: string): Filter[] {
  let pointer = 0
  const filters = []
  let prevDel: RegExpMatchArray | undefined = undefined

  while (pointer < segment.length) {
    const op = matchFirstOperator(segment.substring(pointer))
    if (!op) {
      return filters
    }
    const field = segment.substring(pointer, pointer + op.index)
    pointer += op.index + op[0].length
    const del = matchFirstDelimiter(segment.substring(pointer))
    const value = segment.substring(
      pointer,
      del ? pointer + del.index : segment.length
    )

    pointer += del ? del.index + del[0].length : segment.length

    filters.push({
      field,
      operator: op[0],
      delimiter: prevDel ? prevDel[0] : undefined,
      value
    })

    prevDel = del
  }

  return filters
}

function matchFirstOperator(str: string) {
  return str.match(matchOperatorRegexp)
}

function matchFirstDelimiter(str: string) {
  return str.match(matchDelimiterRegexp)
}
