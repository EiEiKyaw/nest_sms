import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [PrismaModule, CoursesModule, ClassroomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
