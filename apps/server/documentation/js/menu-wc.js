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
                    <a href="index.html" data-type="index-link">server documentation</a>
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' :
                                            'id="xs-controllers-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' :
                                        'id="xs-injectables-links-module-AuthModule-2d311f9df23ee9b096a27d9771cda467782252e1196b4539ccd9913dcca360c3b0eecff8b673126c17f1861d15cd8fd8428ff0ea9429d0a2ec5b170566614a9a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' :
                                            'id="xs-controllers-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' :
                                        'id="xs-injectables-links-module-CategoriesModule-736ab576ee84445cebaba18fc3db9b653704febdc573e0aac1e6b2ce764af4b3b340d65c8fe8b646022d989aa736463f711a74ef7bda7975d073839da4a9c79b"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategorizedCriteriaModule.html" data-type="entity-link" >CategorizedCriteriaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' : 'data-bs-target="#xs-controllers-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' :
                                            'id="xs-controllers-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' }>
                                            <li class="link">
                                                <a href="controllers/CategorizedCriteriaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategorizedCriteriaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' : 'data-bs-target="#xs-injectables-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' :
                                        'id="xs-injectables-links-module-CategorizedCriteriaModule-a81453ce0c2d259b6a3e8d96d2fe6eeb3f77b77ef21ef8c41e275175341c5cbc5b0d9ed95ae0a612e98364ee396c4954e6676afd4c5f7451a9e8e1b07f743c88"' }>
                                        <li class="link">
                                            <a href="injectables/CategorizedCriteriaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategorizedCriteriaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CriterionModule.html" data-type="entity-link" >CriterionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' : 'data-bs-target="#xs-controllers-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' :
                                            'id="xs-controllers-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' }>
                                            <li class="link">
                                                <a href="controllers/CriterionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' : 'data-bs-target="#xs-injectables-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' :
                                        'id="xs-injectables-links-module-CriterionModule-d2751dd0a94d4f3a3f0ea32de2abc8af45b2a120cbf2d5fbca4e0f474b9671ae121f868dea444d6c2c81822f00ce65c396f06f1d317112349b7ecdf8e6582890"' }>
                                        <li class="link">
                                            <a href="injectables/CriterionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentsPerRecopilationsModule.html" data-type="entity-link" >DepartmentsPerRecopilationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' : 'data-bs-target="#xs-controllers-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' :
                                            'id="xs-controllers-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' }>
                                            <li class="link">
                                                <a href="controllers/DepartmentsPerRecopilationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentsPerRecopilationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' : 'data-bs-target="#xs-injectables-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' :
                                        'id="xs-injectables-links-module-DepartmentsPerRecopilationsModule-55b82887f454dbe42d1924133fca19cc32446374d0cdb334f03524537af74f2effe3880ce0572ffd22ad546e8d44f9dc9ef606587773f1c95604f8791bbab54e"' }>
                                        <li class="link">
                                            <a href="injectables/DepartmentsPerRecopilationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentsPerRecopilationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EvidencesModule.html" data-type="entity-link" >EvidencesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' : 'data-bs-target="#xs-controllers-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' :
                                            'id="xs-controllers-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' }>
                                            <li class="link">
                                                <a href="controllers/DocumentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EvidencesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvidencesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LinksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' : 'data-bs-target="#xs-injectables-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' :
                                        'id="xs-injectables-links-module-EvidencesModule-577b8ae8da03a2b2a208df7d818bddfcc4ed56dd5ccbb0132bc2ecb62720068fda3fa9adb6c94af7085e6d5968fb7c69b76b97fe1994791be1a16d55555f55e6"' }>
                                        <li class="link">
                                            <a href="injectables/DocumentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EvidencesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvidencesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LinksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsModule.html" data-type="entity-link" >IndicatorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' : 'data-bs-target="#xs-controllers-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' :
                                            'id="xs-controllers-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' }>
                                            <li class="link">
                                                <a href="controllers/IndicatorsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' : 'data-bs-target="#xs-injectables-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' :
                                        'id="xs-injectables-links-module-IndicatorsModule-7d8f261200ea96aa935880830ebda7aaf1a51504ddb1c9c74c9b50fc3d092aec5f7a1fb062a5bd63a0662b980c65d2c7d946dec3c1b21929c6e5815b243dbb91"' }>
                                        <li class="link">
                                            <a href="injectables/IndicatorsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsPerRecopilationsModule.html" data-type="entity-link" >IndicatorsPerRecopilationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' : 'data-bs-target="#xs-controllers-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' :
                                            'id="xs-controllers-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' }>
                                            <li class="link">
                                                <a href="controllers/IndicatorsPerRecopilationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsPerRecopilationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' : 'data-bs-target="#xs-injectables-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' :
                                        'id="xs-injectables-links-module-IndicatorsPerRecopilationsModule-35e493c94b0dd8b6cf8e285d9e21620c59ac8e689ff655e082f3d99ea1a91c2d53958b38ca826249aee412134ba9abbc13ededc2852d1853fdcaf46dc2c8af5b"' }>
                                        <li class="link">
                                            <a href="injectables/IndicatorsPerRecopilationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorsPerRecopilationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InformationCollectionsModule.html" data-type="entity-link" >InformationCollectionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' : 'data-bs-target="#xs-controllers-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' :
                                            'id="xs-controllers-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' }>
                                            <li class="link">
                                                <a href="controllers/InformationCollectionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformationCollectionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' : 'data-bs-target="#xs-injectables-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' :
                                        'id="xs-injectables-links-module-InformationCollectionsModule-c1391d574a27460054c523ef6831dc60cc28381aac5434f471fad6cfb1badad55d3e6516723b8e107235586928acd298744b7a4672353bad282fa6eb37fec1e4"' }>
                                        <li class="link">
                                            <a href="injectables/InformationCollectionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformationCollectionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailsModule.html" data-type="entity-link" >MailsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailsModule-ef488651469c67723c53c28a054553a360b4da46765ee0eecf6093ee1dab90521d1e1fd2103f8896f4edf6ad275dde54e5a08990bbc3c5b32e89afb20c928cba"' : 'data-bs-target="#xs-injectables-links-module-MailsModule-ef488651469c67723c53c28a054553a360b4da46765ee0eecf6093ee1dab90521d1e1fd2103f8896f4edf6ad275dde54e5a08990bbc3c5b32e89afb20c928cba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailsModule-ef488651469c67723c53c28a054553a360b4da46765ee0eecf6093ee1dab90521d1e1fd2103f8896f4edf6ad275dde54e5a08990bbc3c5b32e89afb20c928cba"' :
                                        'id="xs-injectables-links-module-MailsModule-ef488651469c67723c53c28a054553a360b4da46765ee0eecf6093ee1dab90521d1e1fd2103f8896f4edf6ad275dde54e5a08990bbc3c5b32e89afb20c928cba"' }>
                                        <li class="link">
                                            <a href="injectables/MailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link" >NotificationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' : 'data-bs-target="#xs-controllers-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' :
                                            'id="xs-controllers-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' : 'data-bs-target="#xs-injectables-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' :
                                        'id="xs-injectables-links-module-NotificationsModule-1f189111eb41ba3a83409d78c7e0a1a46493322e410a56eaade8aa62ecf9057341072c3b035c1af75d02dc3c2433a3ec1d0dea57f5ed2d82d9371d0d727ff97a"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecommendationsModule.html" data-type="entity-link" >RecommendationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' : 'data-bs-target="#xs-controllers-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' :
                                            'id="xs-controllers-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' }>
                                            <li class="link">
                                                <a href="controllers/RecommendationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecommendationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' : 'data-bs-target="#xs-injectables-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' :
                                        'id="xs-injectables-links-module-RecommendationsModule-8440b60ba5b8c4054c10ada389a3b7632673a109a5628dae6fa5072ad6c081d56b0b1be0ca270174667617ba599d82ef773b4339388d0c01a45955841e438e72"' }>
                                        <li class="link">
                                            <a href="injectables/MailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RecommendationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecommendationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecopilationsModule.html" data-type="entity-link" >RecopilationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' : 'data-bs-target="#xs-controllers-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' :
                                            'id="xs-controllers-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' }>
                                            <li class="link">
                                                <a href="controllers/RecopilationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecopilationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' : 'data-bs-target="#xs-injectables-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' :
                                        'id="xs-injectables-links-module-RecopilationsModule-85144c6443824d6e8c770d909fff2d5411e0bc1d0402859ce28f74731a17c9bc59930796af24c760b9f215e5bace8d1454491469cc05028b042711e57460205f"' }>
                                        <li class="link">
                                            <a href="injectables/RecopilationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecopilationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SummaryInformationModule.html" data-type="entity-link" >SummaryInformationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' : 'data-bs-target="#xs-controllers-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' :
                                            'id="xs-controllers-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' }>
                                            <li class="link">
                                                <a href="controllers/SummaryInformationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SummaryInformationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' : 'data-bs-target="#xs-injectables-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' :
                                        'id="xs-injectables-links-module-SummaryInformationModule-f443fa21904362ae558e1ff7d8fb9415526b9aea5d2289ea063bb8b9b40f1baddecc492b3b18d95e3f05d7671e41f5065ea2455050a833bd14e3a84a09370320"' }>
                                        <li class="link">
                                            <a href="injectables/SummaryInformationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SummaryInformationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' :
                                            'id="xs-controllers-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' }>
                                            <li class="link">
                                                <a href="controllers/DepartmentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' :
                                        'id="xs-injectables-links-module-UsersModule-3850ad37d0ae4457bd8a5a7723724b885759a681565c2be93f5fbb490ad807ba660447acfe4524454e16a5ce90dd6767af15ac2a8eaff2b8da253bf5d4b325c7"' }>
                                        <li class="link">
                                            <a href="injectables/DepartmentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WordModule.html" data-type="entity-link" >WordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' : 'data-bs-target="#xs-controllers-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' :
                                            'id="xs-controllers-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' }>
                                            <li class="link">
                                                <a href="controllers/WordController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WordController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' : 'data-bs-target="#xs-injectables-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' :
                                        'id="xs-injectables-links-module-WordModule-cbd90b999e2f39d82207629ea517129cab94916b201471784741463036e1ab32fb5e3fd36dd16840db4e0580b817547927923f9c6c5b03152b938f32220d118c"' }>
                                        <li class="link">
                                            <a href="injectables/WordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WordService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategorizedCriteriaController.html" data-type="entity-link" >CategorizedCriteriaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CriterionController.html" data-type="entity-link" >CriterionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DepartmentsController.html" data-type="entity-link" >DepartmentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DepartmentsPerRecopilationsController.html" data-type="entity-link" >DepartmentsPerRecopilationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DocumentsController.html" data-type="entity-link" >DocumentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EvidencesController.html" data-type="entity-link" >EvidencesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ImagesController.html" data-type="entity-link" >ImagesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/IndicatorsController.html" data-type="entity-link" >IndicatorsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/IndicatorsPerRecopilationsController.html" data-type="entity-link" >IndicatorsPerRecopilationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InformationCollectionsController.html" data-type="entity-link" >InformationCollectionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LinksController.html" data-type="entity-link" >LinksController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotificationsController.html" data-type="entity-link" >NotificationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RecommendationsController.html" data-type="entity-link" >RecommendationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RecopilationsController.html" data-type="entity-link" >RecopilationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SummaryInformationController.html" data-type="entity-link" >SummaryInformationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WordController.html" data-type="entity-link" >WordController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/CategorizedCriteria.html" data-type="entity-link" >CategorizedCriteria</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Criteria.html" data-type="entity-link" >Criteria</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DepartmentPerRecopilation.html" data-type="entity-link" >DepartmentPerRecopilation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Evidence.html" data-type="entity-link" >Evidence</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Indicator.html" data-type="entity-link" >Indicator</a>
                                </li>
                                <li class="link">
                                    <a href="entities/IndicatorPerRecopilation.html" data-type="entity-link" >IndicatorPerRecopilation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/InformationCollection.html" data-type="entity-link" >InformationCollection</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Notification.html" data-type="entity-link" >Notification</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Recommendation.html" data-type="entity-link" >Recommendation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Recopilation.html" data-type="entity-link" >Recopilation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategorizedCriteria.html" data-type="entity-link" >CategorizedCriteria</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryToRecommend.html" data-type="entity-link" >CategoryToRecommend</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassValidatorValidationsException.html" data-type="entity-link" >ClassValidatorValidationsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClassValidatorValidationsExceptionFilter.html" data-type="entity-link" >ClassValidatorValidationsExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coordinator.html" data-type="entity-link" >Coordinator</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategorizedCriteriaDto.html" data-type="entity-link" >CreateCategorizedCriteriaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCriteriaDto.html" data-type="entity-link" >CreateCriteriaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDepartmentsPerRecopilationDto.html" data-type="entity-link" >CreateDepartmentsPerRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEvidenceDto.html" data-type="entity-link" >CreateEvidenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateIndicatorDto.html" data-type="entity-link" >CreateIndicatorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateIndicatorPerRecopilationDto.html" data-type="entity-link" >CreateIndicatorPerRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInformationCollectionDto.html" data-type="entity-link" >CreateInformationCollectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotificationDto.html" data-type="entity-link" >CreateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRecommendationDto.html" data-type="entity-link" >CreateRecommendationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRecopilationDto.html" data-type="entity-link" >CreateRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Criteria.html" data-type="entity-link" >Criteria</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriteriaToRelate.html" data-type="entity-link" >CriteriaToRelate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Department.html" data-type="entity-link" >Department</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepartmentPerRecopilation.html" data-type="entity-link" >DepartmentPerRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepartmentToBeRecommended.html" data-type="entity-link" >DepartmentToBeRecommended</a>
                            </li>
                            <li class="link">
                                <a href="classes/Document.html" data-type="entity-link" >Document</a>
                            </li>
                            <li class="link">
                                <a href="classes/Evidence.html" data-type="entity-link" >Evidence</a>
                            </li>
                            <li class="link">
                                <a href="classes/FiltersSegmentDto.html" data-type="entity-link" >FiltersSegmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneParams.html" data-type="entity-link" >FindOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorPerRecopilation.html" data-type="entity-link" >IndicatorPerRecopilation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IndicatorToRelate.html" data-type="entity-link" >IndicatorToRelate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Link.html" data-type="entity-link" >Link</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginAuthDto.html" data-type="entity-link" >LoginAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-1.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-2.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-3.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-4.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-5.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-6.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-7.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-8.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-9.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByParamDto-10.html" data-type="entity-link" >OrderByParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderTypeParamDto.html" data-type="entity-link" >OrderTypeParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedItems.html" data-type="entity-link" >PaginatedItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/Recommendation.html" data-type="entity-link" >Recommendation</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecommendCategoriesDto.html" data-type="entity-link" >RecommendCategoriesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RelateIndicatorsToRecopilationDto.html" data-type="entity-link" >RelateIndicatorsToRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeORMExceptionFilter.html" data-type="entity-link" >TypeORMExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategorizedCriterionDto.html" data-type="entity-link" >UpdateCategorizedCriterionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCriteriaDto.html" data-type="entity-link" >UpdateCriteriaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDepartmentPerRecopilationDto.html" data-type="entity-link" >UpdateDepartmentPerRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEvidenceDto.html" data-type="entity-link" >UpdateEvidenceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateIndicatorDto.html" data-type="entity-link" >UpdateIndicatorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateIndicatorPerRecopilationDto.html" data-type="entity-link" >UpdateIndicatorPerRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInformationCollectionDto.html" data-type="entity-link" >UpdateInformationCollectionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNotificationDto.html" data-type="entity-link" >UpdateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRecopilationDto.html" data-type="entity-link" >UpdateRecopilationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrongPasswordException.html" data-type="entity-link" >WrongPasswordException</a>
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
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategorizedCriteriaService.html" data-type="entity-link" >CategorizedCriteriaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriterionService.html" data-type="entity-link" >CriterionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentsPerRecopilationsService.html" data-type="entity-link" >DepartmentsPerRecopilationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentsService.html" data-type="entity-link" >DepartmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentsService.html" data-type="entity-link" >DocumentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EvidencesService.html" data-type="entity-link" >EvidencesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImagesService.html" data-type="entity-link" >ImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndicatorsPerRecopilationsService.html" data-type="entity-link" >IndicatorsPerRecopilationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndicatorsService.html" data-type="entity-link" >IndicatorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformationCollectionsService.html" data-type="entity-link" >InformationCollectionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LinksService.html" data-type="entity-link" >LinksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailsService.html" data-type="entity-link" >MailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link" >NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecommendationsService.html" data-type="entity-link" >RecommendationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecopilationsService.html" data-type="entity-link" >RecopilationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SuccessfulResponseBuilderInterceptor.html" data-type="entity-link" >SuccessfulResponseBuilderInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SummaryInformationService.html" data-type="entity-link" >SummaryInformationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WordService.html" data-type="entity-link" >WordService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecopilationDto.html" data-type="entity-link" >RecopilationDto</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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