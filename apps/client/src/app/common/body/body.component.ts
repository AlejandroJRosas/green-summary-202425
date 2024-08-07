import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { NotificationComponent } from '../../core/notification/notification.component'
import { BadgeModule } from 'primeng/badge'
import { AvatarModule } from 'primeng/avatar'
import { NotificationService } from '../../services/notification.service'
import { Notification } from '../../../shared/types/notification.type'
import { TooltipModule } from 'primeng/tooltip'

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
    AvatarModule,
    TooltipModule
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  constructor(private NotificationService: NotificationService) {}
  user = {
    fullName: '',
    email: ''
  }
  LabelAvatar: string = ''
  unSeenNotifications: Notification[] = [
    {
      id: 0,
      seen: false,
      type: '',
      data: {
        departmentId: 0,
        departmentName: '',
        recopilationId: 0,
        recopilationName: '',
        categoryId: 0,
        categoryName: '',
        collectionId: 0,
        collectionName: '',
        evidenceId: 0,
        evidenceName: '',
        recommendationsQuantity: 0
      },
      createdAt: new Date()
    }
  ]
  fetchError: boolean = false
  ngOnInit() {
    this.getNotificationsUnSeen()
    this.getDataLocalStorage()
    this.setLabelAvatar()
  }
  reload() {
    window.location.reload()
  }
  setLabelAvatar() {
    this.LabelAvatar = this.getLabelAvatar(this.user.fullName).toUpperCase()
  }
  getLabelAvatar(fullName: string) {
    const words = fullName.split(' ')
    const initials = words.slice(0, 2).map((word) => word.charAt(0))
    return initials.join('')
  }
  getDataLocalStorage() {
    this.user.fullName = JSON.parse(localStorage.getItem('user')!).fullName
    this.user.email = JSON.parse(localStorage.getItem('user')!).email
  }
  getNotificationsUnSeen() {
    this.NotificationService.getOwnUnSeen().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.unSeenNotifications = res.data
        }
      },
      error: (e) => {
        this.fetchError = true
        console.error(e)
      }
    })
  }

  @Input() isCollapsed = false
  @Input() screenWidth = 0

  getBodyClass(): string {
    let styleClass = ''
    if (this.isCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (
      this.isCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}
