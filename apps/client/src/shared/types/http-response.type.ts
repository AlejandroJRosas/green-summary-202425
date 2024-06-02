export type BackendResponse<T, U, V> =
  | {
      status: 'success'
      data: T
    }
  | {
      status: 'fail'
      data: U
    }
  | {
      status: 'error'
      message: string
      data?: V
    }
