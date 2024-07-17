import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private activeRequests = 0
  loading: boolean = false

  constructor() {}

  show() {
    this.activeRequests++
    this.loading = true
  }

  hide() {
    this.activeRequests--
    if (this.activeRequests === 0) {
      this.loading = false
    }
  }

  isLoading(): boolean {
    return this.loading
  }
}
