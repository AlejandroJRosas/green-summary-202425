import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { trigger, transition, style, animate } from '@angular/animations'
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
    // trigger('combinedAnimation', [
    //   transition('* => *', [
    //     animate(
    //       '2s ease-in-out',
    //       style([
    //         {
    //           opacity: 0.3,
    //           transform: 'scale(0.95)'
    //         },
    //         {
    //           opacity: 1,
    //           transform: 'scale(1.1)'
    //         },
    //         {
    //           opacity: 0.3,
    //           transform: 'scale(0.95)'
    //         }
    //       ])
    //     )
    //   ])
    // ])
  ]
})
export class LoadingComponent {
  constructor(@Inject(LoadingService) public loader: LoadingService) {}
}
