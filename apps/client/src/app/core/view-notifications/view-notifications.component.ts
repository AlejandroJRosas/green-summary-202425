import { Component, OnInit } from '@angular/core'
import { NotificationComponent } from '../notification/notification.component'
import { Notification } from '../../../shared/types/notification.type'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-view-coordinator-notifications',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './view-notifications.component.html',
  styles: ``
})
export class ViewNotificationsComponent implements OnInit {
  constructor(private NotificationService: NotificationService) {}
  notifications: Notification[] = [
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
        evidenceName: ''
      },
      createdAt: new Date()
    }
  ]
  fetchError: boolean = false
  ngOnInit() {
    this.getNotifications()
  }
  getNotifications() {
    this.NotificationService.getOwn().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.notifications = res.data
        }
      },
      error: (e) => {
        this.fetchError = true
        console.error(e)
      }
    })
  }
}
