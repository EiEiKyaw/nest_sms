import { CourseTimelineStatus, GeneralStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  isNumber,
  IsNumber,
} from 'class-validator';

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

  // Pagination
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
