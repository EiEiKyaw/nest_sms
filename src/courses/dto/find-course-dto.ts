import { CourseTimelineStatus, GeneralStatus } from '@prisma/client';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';

export class FindCoursesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  @IsEnum(GeneralStatus)
  status?: GeneralStatus;

  @IsOptional()
  @IsString()
  @IsEnum(CourseTimelineStatus)
  course_status?: CourseTimelineStatus;

  @IsOptional()
  @IsBoolean()
  is_publish?: boolean;
}
