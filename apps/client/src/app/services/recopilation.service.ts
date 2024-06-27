import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { BaseUrl } from '../../config'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Department, User } from '../../shared/types/user.type'
import { Recopilation } from '../../shared/types/recopilation.type'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { Category } from '../../shared/types/category.type'

@Injectable({
  providedIn: 'root'
})
export class RecopilationService {
  constructor(private http: HttpClient) {}

  getPaginated(
    paginated: Paginated
  ): Observable<PaginatedResponse<Recopilation, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Recopilation, unknown, unknown>>(
      `${BaseUrl}/recopilations?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC&filters=type%3D%3Ddepartment`
    )
  }

  getActive(): Observable<BackendResponse<Recopilation, unknown, unknown>> {
    return this.http.get<BackendResponse<Recopilation, unknown, unknown>>(
      `${BaseUrl}/recopilations/active`
    )
  }

  getById(
    id: number
  ): Observable<BackendResponse<Recopilation, unknown, unknown>> {
    return this.http.get<BackendResponse<Recopilation, unknown, unknown>>(
      `${BaseUrl}/recopilations/${id}`
    )
  }

  getSelectedDepartments(recopilationid: number) {
    return this.http
      .get<
        BackendResponse<Department[], unknown, unknown>
      >(`${BaseUrl}/departments/recopilation/${recopilationid}`)
      .pipe(map((res) => (res.status === 'success' ? res.data : [])))
  }

  getCategories(recopilationId: number) {
    return this.http
      .get<
        BackendResponse<Category[], unknown, unknown>
      >(`${BaseUrl}/categories/recopilation/${recopilationId}`)
      .pipe(map((res) => (res.status === 'success' ? res.data : [])))
  }

  create(
    recopilation: Recopilation & { id: number }
  ): Observable<
    BackendResponse<CreateRecopilationDto & { id: number }, unknown, unknown>
  > {
    return this.http.put<
      BackendResponse<CreateRecopilationDto & { id: number }, unknown, unknown>
    >(`${BaseUrl}/recopilations`, {
      id: recopilation.id !== -1 ? recopilation.id : undefined,
      name: recopilation.name,
      description: recopilation.description,
      startDate: recopilation.startDate.toISOString(),
      departmentEndDate: recopilation.departmentEndDate.toISOString(),
      endDate: recopilation.endDate.toISOString()
    })
  }

  relateDepartments(departments: RelateDepartmentsDto): Observable<void> {
    return this.http.put<void>(
      `${BaseUrl}/departments-per-recopilations`,
      departments
    )
  }

  relateIndicators(relations: RelateIndicatorsDto): Observable<void> {
    return this.http.put<void>(
      `${BaseUrl}/recopilations/relate-indicators`,
      relations
    )
  }

  recommendCategories(recommendations: RecommendationsDto): Observable<void> {
    return this.http.put<void>(
      `${BaseUrl}/recopilations/recommend-categories`,
      recommendations
    )
  }

  edit(
    id: number,
    recopilation: Recopilation
  ): Observable<BackendResponse<Recopilation, unknown, unknown>> {
    return this.http.patch<BackendResponse<Recopilation, unknown, unknown>>(
      `${BaseUrl}/recopilations/${id}`,
      {
        name: recopilation.name,
        description: recopilation.description,
        startDate: recopilation.startDate.toISOString(),
        departmentEndDate: recopilation.departmentEndDate.toISOString(),
        endDate: recopilation.endDate.toISOString()
      }
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/recopilations/${id}`)
  }
}

//! This should not be exported
export type CreateRecopilationDto = {
  name: string
  description: string
  startDate: string
  departmentEndDate: string
  endDate: string
}

export type CreateUserDTO = Omit<User, 'id' | 'password'>
type Paginated = {
  first: number
  rows: number
}

interface RelateDepartmentsDto {
  recopilationId: number
  departmentsIds: number[]
}

interface RelateIndicatorsDto {
  recopilationId: number
  indicators: {
    indicatorId: number
    criterion: {
      criteriaId: number
      categoryId: number
    }[]
  }[]
}

interface RecommendationsDto {
  recopilationId: number
  departments: {
    departmentId: number
    categories: {
      categoryId: number
    }[]
  }[]
}
