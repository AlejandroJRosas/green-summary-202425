import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { constructLoginDataMail } from './login-data-mail'

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: string, password: string) {
    await this.mailerService.sendMail({
      to: user,
      subject: 'Datos para iniciar sesión',
      html: constructLoginDataMail(user, password)
    })
  }

  async sendNotification(to: string, subject: string, html: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      html
    })
  }
}
