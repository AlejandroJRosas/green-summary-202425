import { Component, Input, OnInit } from '@angular/core'
import { AvatarModule } from 'primeng/avatar'
import { Notification } from '../../../shared/types/notification.type'
import { User } from '../../../shared/types/user.type'
import { NotificationService } from '../../services/notification.service'
import { BadgeModule } from 'primeng/badge'
import { ScrollTopModule } from 'primeng/scrolltop'
import { Router } from '@angular/router'
import { BodyComponent } from '../../common/body/body.component'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AvatarModule, BadgeModule, ScrollTopModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  constructor(
    private NotificationService: NotificationService,
    private router: Router,
    private body: BodyComponent
  ) {}
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
      categoryName: '',
      collectionId: 0,
      collectionName: '',
      evidenceId: 0,
      evidenceName: '',
      recommendationsQuantity: 0
    },
    createdAt: new Date()
  }
  avatarStyles = {
    recommendation: {
      icon: 'pi pi-sparkles',
      color: 'bg-yellow-100'
    },
    informationCollectionCreation: {
      icon: 'pi pi-copy',
      color: 'bg-blue-100'
    },
    informationCollectionEdition: {
      icon: 'pi pi-pencil',
      color: 'bg-green-200'
    },
    evidenceCreation: {
      icon: 'pi pi-file-plus',
      color: 'bg-cyan-200'
    },
    evidenceEdition: {
      icon: 'pi pi-file-edit',
      color: 'bg-pink-200'
    },
    evidenceError: {
      icon: 'pi pi-file-excel',
      color: 'bg-red-100'
    }
  }
  LabelAvatar: string = ''
  userType: string = ''
  ngOnInit() {
    this.getUserFromLocalStorage()
  }
  redirectCategory(notification: Notification) {
    this.seenNotificaction(notification)
    this.getLinkCategory()
  }
  redirectRecopilation(notification: Notification) {
    this.seenNotificaction(notification)
    this.getLinkRecopilation()
  }
  getLinkCategory() {
    const localUserString = localStorage.getItem('user')
    if (!localUserString) {
      this.router.navigateByUrl('login')
      return
    }
    const user: User = JSON.parse(localUserString)
    if (user.type === 'department') {
      if (user.id === this.notification.data.departmentId) {
        this.router.navigateByUrl(
          `pages/information-collection/recopilation/${this.notification.data.recopilationId}/category/${this.notification.data.categoryId}`
        )
      }
    } else {
      this.router.navigateByUrl(
        `pages/view/information-collection/recopilation/${this.notification.data.recopilationId}/category/${this.notification.data.categoryId}/department/${this.notification.data.departmentId}`
      )
    }
  }
  getLinkRecopilation() {
    this.updateLocalSelectedRecopilation()
    this.router.navigate(['pages/home'])
  }
  updateLocalSelectedRecopilation() {
    localStorage.removeItem('selectedRecopilation')
    localStorage.setItem(
      'selectedRecopilation',
      this.notification.data.recopilationId.toString()
    )
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
        next: () => {
          this.body.reload()
        }
      }
    )
  }
  getUserFromLocalStorage() {
    this.userType = JSON.parse(localStorage.getItem('user')!).type
  }
  getDuration(date: Date): string {
    const now = new Date()
    const createdAt = new Date(date)
    const differenceInMilliseconds = now.getTime() - createdAt.getTime()
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
    const differenceInMinutes = Math.floor(differenceInSeconds / 60)
    const differenceInHours = Math.floor(differenceInMinutes / 60)
    const differenceInDays = Math.floor(differenceInHours / 24)

    if (differenceInDays > 10) {
      return this.formatDate(createdAt)
    } else if (differenceInDays === 1) {
      return `Hace 1 día`
    } else {
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
      if (value === 1) {
        unit = unit.substring(0, unit.length - 1)
      }
      return `Hace ${value} ${unit}`
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
}
