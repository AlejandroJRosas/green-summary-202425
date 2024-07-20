import { Color } from 'chart.js'

export interface ChartData {
  labels: string[]
  datasets: [
    {
      label: string
      backgroundColor: string
      borderColor: string
      data: number[]
    }
  ]
}

export interface PieChartData {
  labels: string[]
  datasets: [
    {
      label: string
      backgroundColor: string[]
      hoverBackgroundColor: string[]
      data: number[]
    }
  ]
}

export interface LegendItem {
  text: string
  datasetIndex: 1
  fillStyle: Color
  fontColor: Color
  hidden: boolean
  strokeStyle: Color
}
