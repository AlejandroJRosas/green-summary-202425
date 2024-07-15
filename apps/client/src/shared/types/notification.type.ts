export interface Notification {
  id: number
  seen: boolean
  type: string
  data: {
    departmentId: number
    departmentName: string
    recopilationId: number
    recopilationName: string
    categoryId: number
    categoryName: string
  }
  createdAt: Date
}
