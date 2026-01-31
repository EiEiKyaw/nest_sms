import {
  GeneralStatus,
  CourseTimelineStatus,
  CurrencyType,
} from '@prisma/client';
import { Expose } from 'class-transformer';
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
  short_description: string;

  @IsString()
  long_description: string;

  @IsInt()
  batch_no: number;

  @IsInt()
  duration_months: number;

  @IsNumber()
  fees: number;

  @IsEnum(CurrencyType)
  currency_type: CurrencyType;

  @IsBoolean()
  @IsOptional()
  is_publish?: boolean;

  @IsEnum(CourseTimelineStatus)
  course_status: CourseTimelineStatus;

  @IsEnum(GeneralStatus)
  status: GeneralStatus;

  @IsString()
  @IsOptional()
  original_image_url?: string;

  @IsString()
  @IsOptional()
  thumb_image_url?: string;
}
