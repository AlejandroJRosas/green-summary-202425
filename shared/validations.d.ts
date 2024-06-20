export as namespace validations

export interface Values {
  descriptionMinAmount: number
  descriptionMaxAmount: number
  departmentFullNameMinAmount: number
  departmentFullNameMaxAmount: number
  departmentEmailAmount: number
  departmentPasswordAmount: number
  helpTextMinAmount: number
  helpTextMaxAmount: number
  nameAliasMinAmount: number
  indicatorNameAliasMaxAmount: number
  categoryNameMaxAmount: number
  criterionNameAliasMaxAmount: number
  errorTextAmount: number
  recopilationsNameMaxAmount: number
  informationCollectionsSummary: number
  evidencesLinkMaxAmount: number
  evidencesLinkMinAmount: number
}

export const VALUES: Values
