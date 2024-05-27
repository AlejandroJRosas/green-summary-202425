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
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${BaseUrl}/users/${id}`)
  }
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
