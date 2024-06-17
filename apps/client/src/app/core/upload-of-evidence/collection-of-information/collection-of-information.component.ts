import { Component, Input } from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { collectionInformation } from '../data'
import { ActivatedRoute, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'collection-of-information',
  standalone: true,
  imports: [PanelModule, ButtonModule],
  templateUrl: './collection-of-information.component.html',
  styles: ``
})
export class CollectionOfInformationComponent {
  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}
  collectionInformation = collectionInformation
  @Input() indicatorName = ''
  @Input() categoryName = ''
  currentUrl = ''
  createCollectionInformation() {
    this.currentRoute.url.subscribe((url) => {
      this.currentUrl = url.map((segment) => segment.path).join('/')
    })
    this.router.navigateByUrl(`pages/create/${this.currentUrl}`)
  }
}
