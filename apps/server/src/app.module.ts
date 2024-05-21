import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './core/users/users.module'
import * as path from 'path'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { NotificationsModule } from './core/notifications/notifications.module'
import { InformationCollectionsModule } from './core/information-collections/information-collections.module'
import { EvidencesModule } from './core/evidences/evidences.module'
import { IndicatorsModule } from './core/indicators/indicators.module'
import { CategoriesModule } from './core/categories/categories.module'
import { CriteriaModule } from './core/criteria/criteria.module'
import { RecopilationsModule } from './core/recopilations/recopilations.module'
import { RecommendModule } from './core/recommends/recommends.module'


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
    NotificationsModule,
    InformationCollectionsModule,
    EvidencesModule,
    IndicatorsModule,
    CategoriesModule,
    CriteriaModule,
    RecopilationsModule,
    RecommendModule
  ]
})
export class AppModule {}
