import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class DataSharingEvidenceService {
  public evidencesEntries: EvidenceEntry[] = []

  constructor() {}

  getEvidences(): EvidenceEntry[] {
    return this.evidencesEntries
  }

  getFormGroups(): FormGroup[] {
    return this.evidencesEntries.map((evidence) => evidence.formGroup)
  }

  getFormGroupByEvidence(evidenceId: number): FormGroup | undefined {
    return this.evidencesEntries.find((e) => e.id === evidenceId)?.formGroup
  }

  getDisabledSelectByEvidence(evidenceId: number): boolean | undefined {
    return this.evidencesEntries.find((e) => e.id === evidenceId)
      ?.disabledSelect
  }

  disableSelectByEvidence(evidence: number): void {
    const evidenceToDisable = this.evidencesEntries.find(
      (e) => e.id === evidence
    )
    if (evidenceToDisable) {
      evidenceToDisable.disabledSelect = true
    }
  }

  addEvidence(): void {
    const newEvidenceEntry: EvidenceEntry = {
      id: Math.max(0, ...this.evidencesEntries.map((e) => e.id)) + 1,
      disabledSelect: false,
      formGroup: new FormGroup({
        selectedType: new FormControl<EvidenceFormControl>({
          name: '',
          code: ''
        })
      })
    }

    this.evidencesEntries.unshift(newEvidenceEntry)
  }

  removeEvidence(evidenceId: number): void {
    this.evidencesEntries = this.evidencesEntries.filter(
      (e) => e.id !== evidenceId
    )
  }

  clearEvidences(): void {
    this.evidencesEntries = []
  }
}

interface EvidenceFormControl {
  name: string
  code: string
}

interface EvidenceEntry {
  id: number
  formGroup: FormGroup
  disabledSelect: boolean
}
