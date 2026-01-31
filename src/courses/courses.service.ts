import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeneralSuccessResponseDto } from 'src/common/dto/general-success-response-dto';
import { GeneralFailResponseDto } from 'src/common/dto/general-fail-response-dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const duplicateCheck = await this.checkDuplicateCourse(createCourseDto);
      if (duplicateCheck) return duplicateCheck;

      const course = await this.prisma.course.create({
        data: createCourseDto,
      });
      return new GeneralSuccessResponseDto(
        course,
        `Course ${course.id} created successfully`,
      );
    } catch (error) {
      console.error('Error creating course:', error);
      return new GeneralFailResponseDto('Failed to create course');
    }
  }

  findAll() {
    return `This action returns all courses`;
  }

  async findOne(id: number) {
    return await this.checkValidCourse(id);
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
        course,
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
  ): Promise<Course | GeneralFailResponseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return new GeneralFailResponseDto(`Course '${id}' not found`);
    }

    return course;
  }
}
