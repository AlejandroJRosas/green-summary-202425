import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { User } from '../../shared/types/user.type'
import { BackendResponse } from '../../shared/types/http-response.type'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<User, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<User, unknown, unknown>>(
      `${BaseUrl}/users?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC&filters=type%3D%3Ddepartment`
    )
  }

  getById(id: number): Observable<BackendResponse<User, unknown, unknown>> {
    return this.http.get<BackendResponse<User, unknown, unknown>>(
      `${BaseUrl}/users/${id}`
    )
  }

  create(
    department: CreateUserDTO
  ): Observable<BackendResponse<User, unknown, unknown>> {
    return this.http.post<BackendResponse<User, unknown, unknown>>(
      `${BaseUrl}/users`,
      department
    )
  }
  edit(
    id: number,
    department: User
  ): Observable<BackendResponse<User, unknown, unknown>> {
    return this.http.patch<BackendResponse<User, unknown, unknown>>(
      `${BaseUrl}/users/${id}`,
      department
    )
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/users/${id}`)
  }
}

export type CreateUserDTO = Omit<User, 'id' | 'password'>
type Paginated = {
  first: number
  rows: number
}
