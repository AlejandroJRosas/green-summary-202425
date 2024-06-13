import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output
} from '@angular/core'
import { animate, style, transition, trigger } from '@angular/animations'
import { navbarData } from './nav-data'
import { Router, RouterLink, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Toast } from '../toast/toast.component'

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
    ])
  ]
})
export class SidenavComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router
  ) {}

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

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.toast.show('success', 'Éxito', 'Usted ha cerrado sesión correctamente')
    this.router.navigate(['/login'])
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth
    })
  }
}
