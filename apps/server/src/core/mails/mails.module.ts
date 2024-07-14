import { Module } from '@nestjs/common'
import { MailsService } from './mails.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService, ConfigModule } from 'nestjs-config'

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('host').HOST,
          secure: false,
          auth: {
            user: config.get('user').USER,
            pass: config.get('password').PASSWORD
          }
        },
        defaults: {
          from: `"Green Summary" <${config.get('user').USER}>`
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [MailsService]
})
export class MailsModule {}
