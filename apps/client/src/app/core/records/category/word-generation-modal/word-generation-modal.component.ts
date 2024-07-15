import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { ListboxModule } from 'primeng/listbox'
import { Criteria } from '../../../../../shared/types/criterion.type'
import { WordService } from '../../../../services/word.service'

@Component({
  selector: 'app-word-generation-modal',
  standalone: true,
  imports: [ButtonModule, DialogModule, ListboxModule, ReactiveFormsModule],
  templateUrl: './word-generation-modal.component.html',
  styleUrl: './word-generation-modal.component.css'
})
export class WordGenerationModalComponent {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>()

  @Input() criteria: Array<Omit<Criteria, 'indicator'>> | undefined

  @Input() recopilationId: number | undefined

  @Input() categoryName: string | undefined

  formGroup = new FormGroup({
    criterion: new FormControl<Criteria | null>(null, Validators.required)
  })

  constructor(private wordService: WordService) {}

  generateWord() {
    if (this.recopilationId == null) return
    if (this.formGroup.invalid) return

    this.wordService.downloadWordOf(
      this.formGroup.controls.criterion.value!.id,
      this.recopilationId
    )
    this.hideDialog()
  }

  showDialog() {
    this.changeVisibility(true)
  }

  hideDialog() {
    this.changeVisibility(false)
    this.formGroup.reset()
  }

  private changeVisibility(visible: boolean) {
    this.visible = visible
    this.visibleChange.emit(visible)
  }
}
