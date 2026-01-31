import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeneralSuccessResponseDto } from 'src/common/dto/general-success-response-dto';
import { GeneralFailResponseDto } from 'src/common/dto/general-fail-response-dto';
import { FindCoursesDto } from './dto/find-course-dto';
import { S3Service } from 'src/s3/s3.service';
import * as path from 'path';
import { S3UrlService } from 'src/s3/s3-url.service';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
    private readonly s3UrlService: S3UrlService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const duplicateCheck = await this.checkDuplicateCourse(createCourseDto);
      if (duplicateCheck) return duplicateCheck;

      const course = await this.prisma.course.create({
        data: createCourseDto,
      });
      return new GeneralSuccessResponseDto(
        {
          ...course,
          original_image_url: this.s3UrlService.getFullUrl(
            course.original_image_url || '',
          ),
        },
        `Course ${course.id} created successfully`,
      );
    } catch (error) {
      console.error('Error creating course:', error);
      return new GeneralFailResponseDto('Failed to create course');
    }
  }

  async findAll(filters: FindCoursesDto) {
    const where: any = {};
    const limit = filters.limit ?? 10;
    const page = filters.page ?? 1;

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters.code) {
      where.code = { contains: filters.code, mode: 'insensitive' };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.is_publish) {
      where.is_publish = filters.is_publish;
    }

    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.course.count({ where }),
    ]);

    return new GeneralSuccessResponseDto(
      { courses, total, page, limit },
      'Courses retrieved successfully',
    );
  }

  async findOne(id: number) {
    const validation = await this.checkValidCourse(id);
    if (validation instanceof GeneralFailResponseDto) {
      return validation;
    }

    return new GeneralSuccessResponseDto(
      {
        ...validation,
        original_image_url: this.s3UrlService.getFullUrl(
          validation.original_image_url || '',
        ),
      },
      `Courses '${id}' retrieved successfully`,
    );
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const validation = await this.checkValidCourse(id);
      if (validation instanceof GeneralFailResponseDto) {
        return validation;
      }

      const duplicateCheck = await this.checkDuplicateCourse(
        updateCourseDto,
        id,
      );
      if (duplicateCheck) return duplicateCheck;

      const course = await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
      });

      return new GeneralSuccessResponseDto(
        {
          ...course,
          original_image_url: this.s3UrlService.getFullUrl(
            course.original_image_url || '',
          ),
        },
        `Course ${id} updated successfully`,
      );
    } catch (error) {
      console.error('Error updating course:', error);
      return new GeneralFailResponseDto('Failed to update course');
    }
  }

  async remove(id: number) {
    const validation = await this.checkValidCourse(id);

    if (validation instanceof GeneralFailResponseDto) {
      return validation;
    }

    await this.prisma.course.delete({
      where: {
        id: id,
      },
    });

    return new GeneralSuccessResponseDto(`Course '${id}' deleted successfully`);
  }

  async publish(id: number) {
    const validation = await this.checkValidCourse(id);

    if (validation instanceof GeneralFailResponseDto) {
      return validation;
    }

    if (validation.is_publish) {
      return new GeneralFailResponseDto(`Course '${id}' is already published`);
    }

    await this.prisma.course.update({
      where: { id: id },
      data: { is_publish: true },
    });

    return new GeneralSuccessResponseDto(
      `Course '${id}' has been published successfully`,
    );
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    const validation = await this.checkValidCourse(id);

    if (validation instanceof GeneralFailResponseDto) {
      return validation;
    }

    if (!file) {
      return new GeneralFailResponseDto('No file uploaded');
    }

    const existingKey = validation
      ? `course/${id}/${path.basename(validation.original_image_url)}`
      : undefined;

    if (existingKey) {
      await this.s3Service.deleteFile(existingKey);
    }

    const result = await this.s3Service.uploadFile(
      file.buffer,
      'course',
      id,
      file.originalname,
    );

    await this.prisma.course.update({
      where: { id: id },
      data: { original_image_url: result.key },
    });

    return new GeneralSuccessResponseDto(
      result.key,
      'Course image uploaded successfully',
    );
  }

  private async checkDuplicateCourse(
    data: CreateCourseDto | UpdateCourseDto,
    courseId?: number,
  ) {
    const conditions: any[] = [];
    if (data.name) conditions.push({ name: data.name });
    if (data.code) conditions.push({ code: data.code });

    if (conditions.length === 0) return null;

    const duplicate = await this.prisma.course.findFirst({
      where: {
        OR: conditions,
        AND: courseId ? { id: { not: courseId } } : undefined,
      },
    });

    if (duplicate) {
      return new GeneralFailResponseDto(
        `Course with name '${data.name || duplicate.name}' or code '${data.code || duplicate.code}' already exists`,
      );
    }

    return null;
  }

  private async checkValidCourse(
    id: number,
  ): Promise<any | GeneralFailResponseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return new GeneralFailResponseDto(`Course '${id}' not found`);
    }

    return course;
  }

  private async checkAlreadyPublish(
    id: number,
  ): Promise<Boolean | GeneralFailResponseDto> {
    const course = await this.checkValidCourse(id);

    if (!course) {
      return new GeneralFailResponseDto(`Course '${id}' not found`);
    }

    return course.is_publish;
  }
}
