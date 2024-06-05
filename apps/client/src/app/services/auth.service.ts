import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseUrl } from '../../config'
import { decodeJwtPayload } from '../../utils/decode-jwt-payload'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuth(): boolean {
    try {
      const token = localStorage.getItem('token')
      //TODO: Refactor this to use a type guard for UserJwtPayload
      const user: UserJwtPayload = decodeJwtPayload(token) as UserJwtPayload
      const expDate = new Date(user.exp * 1000)

      if (expDate < new Date()) {
        return false
      }
    } catch (error: unknown) {
      //TODO: Refactor error handling
      if (!(error instanceof Error)) {
        throw error
      }

      //! - This is a bad practice, we should not rely on the error message
      if (error.message === 'Invalid jwt token provided') {
        return false
      }

      console.error(error)
      return false
    }

    return true
  }

  isRole(roles: RoleType[]): boolean {
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

export type AuthResponse = {
  status: string
  data: {
    user: User
    token: string
  }
}

type LoginPayload = {
  email: string
  password: string
}

type User = {
  id: number
  fullName: string
  email: string
  password: string
  type: string
}

type UserJwtPayload = {
  id: number
  name: string
  type: string
  iat: number
  exp: number
}
