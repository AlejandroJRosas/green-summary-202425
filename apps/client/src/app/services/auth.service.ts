import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseUrl } from '../../config'
import { LoginPayload } from '../core/login/login.component'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuth(roles: RoleType[]): boolean {
    const user = localStorage.getItem('user')
    if (user) {
      const userRole = JSON.parse(user).type
      return roles.includes(userRole as RoleType)
    }
    return false
  }

  login(loginPayload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BaseUrl}/auth/login`, loginPayload)
  }
}

export const Role = {
  COORDINATOR: 'coordinator',
  DEPARTMENT: 'department',
  ADMIN: 'admin'
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

type User = {
  id: number
  fullName: string
  email: string
  password: string
  type: string
}

type AuthResponse = {
  status: string
  data: {
    user: User
    token: string
  }
}
