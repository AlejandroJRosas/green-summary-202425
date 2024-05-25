export type HttpResponse<T> =
  | {
      status: 'success' | 'fail'
      data: T
    }
  | {
      status: 'error'
      message: string
      data?: T
    }
