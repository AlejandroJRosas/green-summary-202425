import { Component, Input, OnInit } from '@angular/core'
import { AvatarModule } from 'primeng/avatar'
import { Notification } from '../../../shared/types/notification.type'
import { User } from '../../../shared/types/user.type'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './notification.component.html',
  styles: ``
})
export class NotificationComponent implements OnInit {
  constructor(private NotificationService: NotificationService) {}
  @Input() notification: Notification = {
    id: 0,
    seen: false,
    type: '',
    data: {
      departmentId: 0,
      departmentName: '',
      recopilationId: 0,
      recopilationName: '',
      categoryId: 0,
      categoryName: ''
    },
    createdAt: new Date()
  }
  LabelAvatar: string = ''
  ngOnInit() {
    this.setLabelAvatar()
  }
  setLabelAvatar() {
    this.LabelAvatar = this.getLabelAvatar(
      this.notification.data.departmentName
    ).toUpperCase()
  }
  getLabelAvatar(fullName: string) {
    const words = fullName.split(' ')
    const initials = words.slice(0, 2).map((word) => word.charAt(0))
    return initials.join('')
  }
  getLink(): string {
    const localUserString = localStorage.getItem('user')
    if (!localUserString) {
      return 'login'
    }
    const user: User = JSON.parse(localUserString)

    if (user.type === 'department') {
      if (user.id === this.notification.data.departmentId) {
        return `pages/information-collection/recopilation/${this.notification.data.recopilationId}/category/${this.notification.data.categoryId}`
      }
      return ''
    }

    return `pages/view/information-collection/recopilation/${this.notification.data.recopilationId}/category/${this.notification.data.categoryId}/department/${this.notification.data.departmentId}`
  }
  getLinkMatrix(): string {
    const localUserString = localStorage.getItem('user')
    if (!localUserString) {
      return 'login'
    }

    return 'pages/home'
  }
  seenNotificaction(notification: Notification) {
    this.notification.seen = true
    this.NotificationService.edit(this.notification.id, notification).subscribe(
      {
        next: (res) => {
          if (res.status === 'success') {
            console.log('se editó compadre')
          }
        }
      }
    )
  }
  getDuration(date: Date): string {
    const now = new Date()
    const createdAt = new Date(date)
    createdAt.setHours(createdAt.getHours() - 4)
    const differenceInMilliseconds = now.getTime() - createdAt.getTime()
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
    const differenceInMinutes = Math.floor(differenceInSeconds / 60)
    const differenceInHours = Math.floor(differenceInMinutes / 60)
    const differenceInDays = Math.floor(differenceInHours / 24)
    let unit: string
    let value: number
    if (differenceInSeconds < 60) {
      unit = 'segundos'
      value = differenceInSeconds
    } else if (differenceInMinutes < 60) {
      unit = 'minutos'
      value = differenceInMinutes
    } else if (differenceInHours < 24) {
      unit = 'horas'
      value = differenceInHours
    } else {
      unit = 'días'
      value = differenceInDays
    }
    return `Hace ${value} ${unit}`
  }
}
