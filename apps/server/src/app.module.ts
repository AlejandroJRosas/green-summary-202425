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
import { CriterionModule } from './core/criterion/criterion.module'
import { RecopilationsModule } from './core/recopilations/recopilations.module'
import { AuthModule } from './core/auth/auth.module'
import { RecommendationsModule } from './core/recommendations/recommendations.module'
import { IndicatorsPerRecopilationsModule } from './core/indicators-per-recopilations/indicators-per-recopilations.module'
import { DepartmentsPerRecopilationsModule } from './core/departments-per-recopilations/departments-per-recopilations.module'
import { CategorizedCriteriaModule } from './core/categorized-criteria/categorized-criteria.module'

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
    AuthModule,
    UsersModule,
    RecopilationsModule,
    IndicatorsModule,
    CategoriesModule,
    CriterionModule,
    RecopilationsModule,
    RecommendationsModule,
    IndicatorsPerRecopilationsModule,
    CategorizedCriteriaModule,
    DepartmentsPerRecopilationsModule,
    RecommendationsModule,
    InformationCollectionsModule,
    EvidencesModule,
    NotificationsModule
  ]
})
export class AppModule {}
