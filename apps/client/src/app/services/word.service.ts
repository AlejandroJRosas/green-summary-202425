import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { BaseUrl } from '../../config'

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(private http: HttpClient) {}

  downloadWordOf(criterionId: number, recopilationId: number): Subscription {
    return this.http
      .get(`${BaseUrl}/word/${criterionId}/${recopilationId}`, {
        observe: 'response',
        responseType: 'blob'
      })
      .subscribe((res) => {
        if (res.status !== 200) return

        const filename =
          res.headers.get('Content-Disposition')?.split('filename=')[1] ||
          'word.docx'

        const blob = res.body

        if (blob == null) return

        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(
          new File([blob], filename, { type: blob.type })
        )

        if (filename) downloadLink.setAttribute('download', filename)

        document.body.appendChild(downloadLink)
        downloadLink.click()
      })
  }
}
