import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { NotificationComponent } from '../../core/notification/notification.component'
import { BadgeModule } from 'primeng/badge'
import { AvatarModule } from 'primeng/avatar'

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    OverlayPanelModule,
    NotificationComponent,
    BadgeModule,
    AvatarModule
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  user = {
    fullName: '',
    email: ''
  }
  ngOnInit() {
    this.getDataLocalStorage()
  }
  getDataLocalStorage() {
    this.user.fullName = JSON.parse(localStorage.getItem('user')!).fullName
    this.user.email = JSON.parse(localStorage.getItem('user')!).email
  }
}
