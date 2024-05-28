import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<ResponseType> {
    return this.http.get<ResponseType>(`${BaseUrl}/users`)
  }
  create(departmentPayload: CreateDepartmentPayload): Observable<any> {
    return this.http.post<any>(`${BaseUrl}/users`, departmentPayload)
  }
  edit(
    id: number,
    departmentPayload: CreateDepartmentPayload
  ): Observable<any> {
    return this.http.patch<any>(`${BaseUrl}/users/${id}`, departmentPayload)
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${BaseUrl}/users/${id}`)
  }
}

export type CreateDepartmentPayload = {
  fullName: string
  email: string
  password: string
  type: 'department'
}

type ResponseType = {
  status: string
  data: {
    currentPage: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    totalPages: number
    totalItems: number
    items: {
      id: number
      fullName: string
      email: string
      password: string
      type: string
    }[]
  }
}
