import { categoriesIndicator1, categoriesIndicator2 } from './categories.data'

export const data = [
  {
    key: 0,
    label: 'Indicador 1',
    data: 'Indicator 1',
    categories: categoriesIndicator1,
    children: [
      {
        key: '0-0',
        label: 'Criterio 1',
        data: 'Criteria 1',
        type: 'criteria',
        category: null
      },
      {
        key: '0-1',
        label: 'Criterio 2',
        data: 'Criteria 2',
        type: 'criteria',
        category: null
      }
    ]
  },
  {
    key: '1',
    label: 'Indicador 2',
    data: 'Indicator 2',
    categories: categoriesIndicator2,
    children: [
      {
        key: '1-0',
        label: 'Criterio 3',
        data: 'Criteria 3',
        type: 'criteria',
        category: null
      },
      {
        key: '1-1',
        label: 'Criterio 4',
        data: 'Criteria 4',
        type: 'criteria',
        category: null
      }
    ]
  },
  {
    key: '2',
    label: 'Indicador 3',
    data: 'Indicator 3',
    categories: categoriesIndicator1,
    children: [
      {
        key: '2-0',
        label: 'Criterio 5',
        data: 'Criteria 5',
        type: 'criteria',
        category: null
      },
      {
        key: '2-1',
        label: 'Criterio 6',
        data: 'Criteria 6',
        type: 'criteria',
        category: null
      }
    ]
  }
]
