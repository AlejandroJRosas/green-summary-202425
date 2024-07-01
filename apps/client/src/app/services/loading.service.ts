import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false

  constructor() {}

  show() {
    this.loading = true
  }

  hide() {
    this.loading = false
  }

  getLoading(): boolean {
    return this.loading
  }
}
