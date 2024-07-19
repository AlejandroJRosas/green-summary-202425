'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BodyComponent.html" data-type="entity-link" >BodyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoryComponent.html" data-type="entity-link" >CategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategorySelectorComponent.html" data-type="entity-link" >CategorySelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CollectionOfInformationComponent.html" data-type="entity-link" >CollectionOfInformationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CreateEvidencesComponent.html" data-type="entity-link" >CreateEvidencesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CriteriaComponent.html" data-type="entity-link" >CriteriaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomTdComponent.html" data-type="entity-link" >CustomTdComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DepartmentComponent.html" data-type="entity-link" >DepartmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditEvidenceComponent.html" data-type="entity-link" >EditEvidenceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EvidenceComponent.html" data-type="entity-link" >EvidenceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EvidenceDocumentComponent.html" data-type="entity-link" >EvidenceDocumentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EvidenceImageComponent.html" data-type="entity-link" >EvidenceImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EvidenceLinkComponent.html" data-type="entity-link" >EvidenceLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IndicatorsComponent.html" data-type="entity-link" >IndicatorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InformationCollectionViewComponent.html" data-type="entity-link" >InformationCollectionViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InformationRecopilationComponent.html" data-type="entity-link" >InformationRecopilationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingComponent.html" data-type="entity-link" >LoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MatrixComponent.html" data-type="entity-link" >MatrixComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundComponent.html" data-type="entity-link" >NotFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationComponent.html" data-type="entity-link" >NotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PreviewComponent.html" data-type="entity-link" >PreviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecommendCategoriesDepartmentComponent.html" data-type="entity-link" >RecommendCategoriesDepartmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecopilationComponent.html" data-type="entity-link" >RecopilationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordsCategoryBodyComponent.html" data-type="entity-link" >RecordsCategoryBodyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordsCategoryHeaderComponent.html" data-type="entity-link" >RecordsCategoryHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordsComponent.html" data-type="entity-link" >RecordsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SchemeComponent.html" data-type="entity-link" >SchemeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectDepartmentsComponent.html" data-type="entity-link" >SelectDepartmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectIndicatorsCategoriesCriteriaComponent.html" data-type="entity-link" >SelectIndicatorsCategoriesCriteriaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidenavComponent.html" data-type="entity-link" >SidenavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StatisticsComponent.html" data-type="entity-link" >StatisticsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepsRoutingComponent.html" data-type="entity-link" >StepsRoutingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Toast.html" data-type="entity-link" >Toast</a>
                            </li>
                            <li class="link">
                                <a href="components/TooltipIcon.html" data-type="entity-link" >TooltipIcon</a>
                            </li>
                            <li class="link">
                                <a href="components/UnauthorizedComponent.html" data-type="entity-link" >UnauthorizedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UploadOfEvidenceComponent.html" data-type="entity-link" >UploadOfEvidenceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewNotificationsComponent.html" data-type="entity-link" >ViewNotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WordGenerationModalComponent.html" data-type="entity-link" >WordGenerationModalComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Base.html" data-type="entity-link" >Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategorySelect.html" data-type="entity-link" >CategorySelect</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterionCheckbox.html" data-type="entity-link" >CriterionCheckbox</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormHandler.html" data-type="entity-link" >FormHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorCheckbox.html" data-type="entity-link" >IndicatorCheckbox</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidatedFormGroup.html" data-type="entity-link" >ValidatedFormGroup</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriteriaService.html" data-type="entity-link" >CriteriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSharingEvidenceService.html" data-type="entity-link" >DataSharingEvidenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentService.html" data-type="entity-link" >DepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EvidenceService.html" data-type="entity-link" >EvidenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndicatorService.html" data-type="entity-link" >IndicatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformationCollectionService.html" data-type="entity-link" >InformationCollectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LinkEvidenceService.html" data-type="entity-link" >LinkEvidenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecopilationService.html" data-type="entity-link" >RecopilationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WordService.html" data-type="entity-link" >WordService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Answer.html" data-type="entity-link" >Answer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryByRecopilation.html" data-type="entity-link" >CategoryByRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Criteria.html" data-type="entity-link" >Criteria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriterionByRecopilation.html" data-type="entity-link" >CriterionByRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link" >Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailedRecopilation.html" data-type="entity-link" >DetailedRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailedRecopilationDto.html" data-type="entity-link" >DetailedRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Evidence.html" data-type="entity-link" >Evidence</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartmentComponent.html" data-type="entity-link" >IDepartmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginComponent.html" data-type="entity-link" >ILoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Indicator.html" data-type="entity-link" >Indicator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IndicatorByRecopilation.html" data-type="entity-link" >IndicatorByRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InformationCollection.html" data-type="entity-link" >InformationCollection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedItems.html" data-type="entity-link" >PaginatedItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecommendationsDto.html" data-type="entity-link" >RecommendationsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelateDepartmentsDto.html" data-type="entity-link" >RelateDepartmentsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelateIndicatorsDto.html" data-type="entity-link" >RelateIndicatorsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SideNavToggle.html" data-type="entity-link" >SideNavToggle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/typeEvidence.html" data-type="entity-link" >typeEvidence</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});