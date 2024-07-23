import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class DataSharingEvidenceService {
  public evidences: number[] = []
  public formGroups: FormGroup[] = []
  public disabledSelect: boolean[] = []
  private formGroupsMap: Map<number, FormGroup> = new Map()
  private evidenceIndexCounter = 0

  constructor() {}

  getFormGroups(): FormGroup[] {
    return this.formGroups
  }
  getFormGroupByEvidence(evidence: number): FormGroup {
    return this.formGroups[evidence]
  }
  getDisabledSelectByEvidence(evidence: number): boolean {
    return this.disabledSelect[evidence]
  }
  changeDisabledSelectByEvidence(evidence: number): boolean {
    this.disabledSelect[evidence] = true
    return this.disabledSelect[evidence]
  }
  addFormGroup() {
    const newformGroup = new FormGroup({
      selectedType: new FormControl<typeEvidence>({
        name: '',
        code: ''
      })
    })
    this.formGroups.push(newformGroup)
    return newformGroup
  }
  getEvidences(): number[] {
    return this.evidences
  }
  getLenghtEvidences() {
    return this.evidences.length
  }
  addEvidence(): void {
    const newEvidenceIndex = this.evidenceIndexCounter + 1
    this.evidenceIndexCounter++
    const disabledSelect = false
    this.evidences.push(newEvidenceIndex)
    const newFormGroup = new FormGroup({
      selectedType: new FormControl<typeEvidence>({
        name: '',
        code: ''
      })
    })
    this.formGroups.push(newFormGroup)
    this.disabledSelect.push(disabledSelect)
  }
  setEvidences(evidences: number[]): void {
    this.evidences = evidences
  }
  removeEvidence(indexEvidence: number): void {
    if (this.evidences.length === 1) {
      this.evidences.pop()
      this.formGroups.pop()
      this.disabledSelect.pop()
    } else {
      this.evidences.splice(indexEvidence, 1)
      this.formGroupsMap.delete(indexEvidence)
      this.disabledSelect.splice(indexEvidence, 1)
      console.log(indexEvidence)
    }
  }
}
interface typeEvidence {
  name: string
  code: string
}
