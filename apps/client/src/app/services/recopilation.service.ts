import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { BaseUrl } from '../../config'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Department, User } from '../../shared/types/user.type'
import { Recopilation } from '../../shared/types/recopilation.type'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { Category } from '../../shared/types/category.type'
import { Indicator } from '../../shared/types/indicator.type'
import { Criteria } from '../../shared/types/criterion.type'

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
      `${BaseUrl}/recopilations?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC`
    )
  }

  getAll(): Observable<Recopilation[]> {
    return this.http
      .get<
        PaginatedResponse<Recopilation, unknown, unknown>
      >(`${BaseUrl}/recopilations?itemsPerPage=999&page=1&orderBy=id&orderType=DESC`)
      .pipe(map((res) => (res.status === 'success' ? res.data.items : [])))
  }

  getActive(): Observable<BackendResponse<Recopilation, unknown, unknown>> {
    return this.http.get<BackendResponse<Recopilation, unknown, unknown>>(
      `${BaseUrl}/recopilations/active`
    )
  }

  getById(id: number): Observable<DetailedRecopilation | null> {
    return this.http
      .get<
        BackendResponse<DetailedRecopilationDto, unknown, unknown>
      >(`${BaseUrl}/recopilations/${id}`)
      .pipe(
        map((res) =>
          res.status === 'success'
            ? this.parseDetailedRecopilationDto(res.data)
            : null
        )
      )
  }

  private parseDetailedRecopilationDto(
    dto: DetailedRecopilationDto
  ): DetailedRecopilation {
    return {
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      departmentEndDate: new Date(dto.departmentEndDate)
    }
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

  setAsReady(recopilationId: number): Observable<void> {
    return this.http.patch<void>(
      `${BaseUrl}/recopilations/${recopilationId}/set-as-ready`,
      {}
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

export interface DetailedRecopilation {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  departmentEndDate: Date
  isReady: boolean
  departments: {
    department: Department
    recommendedCategories: Category[]
  }[]
  indicators: {
    indicator: Indicator
    criteria: {
      criterion: Criteria
      category: Category
    }[]
  }[]
}

interface DetailedRecopilationDto {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  departmentEndDate: string
  isReady: boolean
  departments: {
    department: Department
    recommendedCategories: Category[]
  }[]
  indicators: {
    indicator: Indicator
    criteria: {
      criterion: Criteria
      category: Category
    }[]
  }[]
}
