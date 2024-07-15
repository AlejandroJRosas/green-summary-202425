import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'
import { Notification } from '../../shared/types/notification.type'
import { BackendResponse } from '../../shared/types/http-response.type'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { User } from '../../shared/types/user.type'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Notification, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Notification, unknown, unknown>>(
      `${BaseUrl}/notifications?itemsPerPage=100&page=${page}&orderBy=createdAt&orderType=DESC`
    )
  }

  getOwn(): Observable<BackendResponse<Notification[], unknown, unknown>> {
    return this.http.get<BackendResponse<Notification[], unknown, unknown>>(
      `${BaseUrl}/notifications/own`
    )
  }
  getOwnUnSeen(): Observable<
    BackendResponse<Notification[], unknown, unknown>
  > {
    return this.http.get<BackendResponse<Notification[], unknown, unknown>>(
      `${BaseUrl}/notifications/own/unseen`
    )
  }
  edit(
    id: number,
    notification: Notification
  ): Observable<BackendResponse<NotificationById, unknown, unknown>> {
    return this.http.patch<BackendResponse<NotificationById, unknown, unknown>>(
      `${BaseUrl}/notifications/${id}`,
      notification
    )
  }
}
export type NotificationById = Notification & {
  user: User
}
type Paginated = {
  first: number
  rows: number
}
