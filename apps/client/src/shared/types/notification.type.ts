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
    collectionId: number
    collectionName: string
    evidenceId: number
    evidenceName: string
    recommendationsQuantity: number
  }
  createdAt: Date
}
