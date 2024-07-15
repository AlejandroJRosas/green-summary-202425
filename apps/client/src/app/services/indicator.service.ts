import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable, forkJoin, map, switchMap } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Indicator } from '../../shared/types/indicator.type'
import { Category } from '../../shared/types/category.type'
import { Criteria } from '../../shared/types/criterion.type'
import { CategoryService } from './category.service'
import { CriteriaService } from './criteria.service'

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private criterionService: CriteriaService
  ) {}

  get(
    paginated: Paginated
  ): Observable<PaginatedResponse<Indicator, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators?itemsPerPage=${rows}&page=${page}&orderBy=index&orderType=ASC`
    )
  }

  getAll(): Observable<Indicator[]> {
    return this.http
      .get<
        PaginatedResponse<Indicator, unknown, unknown>
      >(`${BaseUrl}/indicators?itemsPerPage=999&orderBy=index&orderType=ASC`)
      .pipe(
        map((response) =>
          response.status === 'success' ? response.data.items : []
        )
      )
  }

  getAllIndicators(): Observable<Scheme[]> {
    return this.getAll().pipe(
      switchMap((indicators) => {
        const indicatorObservables = indicators.map((i) => {
          const categories$ =
            this.categoryService.getAllCategoriesByIndicatorIndex(i.index)
          const criterias$ =
            this.criterionService.getAllCriterionByIndicatorIndex(i.index)

          return forkJoin([categories$, criterias$]).pipe(
            map(([categories, criterias]) => ({
              ...i,
              categories:
                categories.status === 'success' ? categories.data : [],
              criterias: criterias.status === 'success' ? criterias.data : []
            }))
          )
        })

        const result = forkJoin(indicatorObservables)
        return result
      })
    )
  }

  getById(
    id: number
  ): Observable<BackendResponse<Indicator, unknown, unknown>> {
    return this.http.get<BackendResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators/${id}`
    )
  }

  getByRecopilation(
    recopilationId: number
  ): Observable<IndicatorByRecopilation[]> {
    return this.http
      .get<
        BackendResponse<IndicatorByRecopilation[], unknown, unknown>
      >(`${BaseUrl}/indicators/recopilation/${recopilationId}`)
      .pipe(
        map((response) => (response.status === 'success' ? response.data : []))
      )
  }

  create(
    indicator: CreateIndicatorDTO
  ): Observable<BackendResponse<Indicator, unknown, unknown>> {
    return this.http.post<BackendResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators`,
      indicator
    )
  }

  edit(
    id: number,
    indicator: CreateIndicatorDTO
  ): Observable<BackendResponse<Indicator, unknown, unknown>> {
    return this.http.patch<BackendResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators/${id}`,
      indicator
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/indicators/${id}`)
  }
}

export type CreateIndicatorDTO = Indicator

type Paginated = {
  first: number
  rows: number
}

export type Scheme = Indicator & {
  categories: Category[]
  criterias: Criteria[]
}

export interface IndicatorByRecopilation extends Indicator {
  categories: CategoryByRecopilation[]
}

export interface CategoryByRecopilation extends Omit<Category, 'indicator'> {
  criteria: CriterionByRecopilation[]
}

interface CriterionByRecopilation extends Omit<Criteria, 'indicator'> {}
