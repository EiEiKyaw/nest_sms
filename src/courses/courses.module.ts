import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { S3UrlService } from 'src/s3/s3-url.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService, S3Service, S3UrlService],
})
export class CoursesModule {}
