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

  formGroup = new FormGroup({
    criterion: new FormControl('', Validators.required)
  })

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
