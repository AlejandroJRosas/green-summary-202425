import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: string, password: string) {
    await this.mailerService.sendMail({
      to: user,
      subject: 'DATOS DEL USUARIO',
      html: `<b>Usuario: ${user}    Contraseña: ${password}</b>`
    })
  }
}
