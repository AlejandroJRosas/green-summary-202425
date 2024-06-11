import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core'
import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations'
import { navbarData } from './nav-data'
import { RouterLink, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

export interface SideNavToggle {
  screenWidth: number
  isCollapsed: boolean
}

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter()
  isCollapsed = false
  screenWidth = 0
  navData = navbarData

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth
    if (this.screenWidth <= 768) {
      this.isCollapsed = false
      this.onToggleSidenav.emit({
        isCollapsed: this.isCollapsed,
        screenWidth: this.screenWidth
      })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth
    })
  }
  closeSidenav() {
    this.isCollapsed = false
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth
    })
  }
}
