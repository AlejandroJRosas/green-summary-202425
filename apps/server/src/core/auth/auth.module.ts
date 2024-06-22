import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { AuthGuard } from './auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './roles.guard'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const JWT_CONFIG = config.get('jwt')

        return {
          global: true,
          secret: JWT_CONFIG.SECRET,
          signOptions: { expiresIn: '10d' }
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AuthService
  ]
})
export class AuthModule {}
