import {
  CourseStatus,
  CourseTimelineStatus,
  CurrencyType,
} from '@prisma/client';
import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  shortDescription: string;

  @IsString()
  longDescription: string;

  @IsInt()
  batchNo: number;

  @IsInt()
  durationMonths: number;

  @IsNumber()
  fees: number;

  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsBoolean()
  @IsOptional()
  isPublish?: boolean;

  @IsEnum(CourseTimelineStatus)
  status: CourseTimelineStatus;

  @IsEnum(CourseStatus)
  courseStatus: CourseStatus;

  @IsString()
  @IsOptional()
  originalImageUrl?: string;

  @IsString()
  @IsOptional()
  thumbImageUrl?: string;
}
