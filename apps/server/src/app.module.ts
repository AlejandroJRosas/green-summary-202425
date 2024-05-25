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
import { RecommendationsModule } from './core/recommendations/recommendations.module'
import { IndicatorsPerRecopilationsModule } from './core/indicators_per_recopilations/indicators_per_recopilations.module'
import { CategoriesPerRecopilationsModule } from './core/categories_per_recopilations/categories_per_recopilations.module'
import { CriteriaPerRecopilationsModule } from './core/criteria_per_recopilations/criteria_per_recopilations.module'
import { DepartmentsPerRecopilationsModule } from './core/departments_per_recopilations/departments_per_recopilations.module'
import { AnswersModule } from './core/answers/answers.module'
import { CategorizedCriteriaModule } from './core/categorized_criteria/categorized_criteria.module'

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
    RecommendationsModule,
    IndicatorsPerRecopilationsModule,
    CategoriesPerRecopilationsModule,
    CriteriaPerRecopilationsModule,
    DepartmentsPerRecopilationsModule,
    AnswersModule,
    CategorizedCriteriaModule
  ]
})
export class AppModule {}
