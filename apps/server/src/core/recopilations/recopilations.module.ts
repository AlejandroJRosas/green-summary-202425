import { Module } from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { RecopilationsController } from './recopilations.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Recopilation } from './entities/recopilation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Recopilation])],
  controllers: [RecopilationsController],
  providers: [RecopilationsService],
  exports: [TypeOrmModule]
})
export class RecopilationsModule {}
