import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database.module';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TasksController],
  providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
