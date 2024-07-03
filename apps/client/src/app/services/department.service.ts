import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable, map } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { Department } from '../../shared/types/user.type'
import { BackendResponse } from '../../shared/types/http-response.type'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  get(
    paginated: Paginated
  ): Observable<PaginatedResponse<Department, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Department, unknown, unknown>>(
      `${BaseUrl}/users?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC&filters=type%3D%3Ddepartment`
    )
  }

  getAll(): Observable<Department[]> {
    return this.http
      .get<
        PaginatedResponse<Department, unknown, unknown>
      >(`${BaseUrl}/departments?itemsPerPage=999&orderBy=fullName&orderType=ASC`)
      .pipe(
        map((response) =>
          response.status === 'success' ? response.data.items : []
        )
      )
  }

  getById(
    id: number
  ): Observable<BackendResponse<Department, unknown, unknown>> {
    return this.http.get<BackendResponse<Department, unknown, unknown>>(
      `${BaseUrl}/users/${id}`
    )
  }

  create(
    department: CreateUserDTO
  ): Observable<BackendResponse<Department, unknown, unknown>> {
    return this.http.post<BackendResponse<Department, unknown, unknown>>(
      `${BaseUrl}/users`,
      department
    )
  }
  edit(
    id: number,
    department: Department
  ): Observable<BackendResponse<Department, unknown, unknown>> {
    return this.http.patch<BackendResponse<Department, unknown, unknown>>(
      `${BaseUrl}/users/${id}`,
      department
    )
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/users/${id}`)
  }
}

export type CreateUserDTO = Omit<Department, 'id' | 'password'>
type Paginated = {
  first: number
  rows: number
}
