import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './core/users/users.module'
import * as path from 'path'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { IndicatorsModule } from './core/indicators/indicators.module'
import { CategoriesModule } from './core/categories/categories.module'

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const DATABASE_CONFIG = config.get('database')

        return {
          type: 'postgres',
          url: DATABASE_CONFIG.URL,
          autoLoadEntities: true,
          synchronize: true
        }
      },
      inject: [ConfigService]
    }),
    UsersModule,
    IndicatorsModule,
    CategoriesModule
  ]
})
export class AppModule {}
