import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'evidence-image',
  standalone: true,
  imports: [InputTextareaModule, FileUploadModule, InputTextModule],
  templateUrl: './evidence-image.component.html',
  styles: ``
})
export class EvidenceImageComponent {
  uploadFiles: File[] = []
  onSelect(event: FileSelectEvent) {
    this.uploadFiles = event.currentFiles
    console.log(this.uploadFiles)
  }
}
