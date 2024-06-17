import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'

@Component({
  selector: 'evidence-document',
  standalone: true,
  imports: [InputTextareaModule, FileUploadModule],
  templateUrl: './evidence-document.component.html',
  styles: ``
})
export class EvidenceDocumentComponent {
  uploadFiles: File[] = []
  onSelect(event: FileSelectEvent) {
    this.uploadFiles = event.currentFiles
    console.log(this.uploadFiles)
  }
}
