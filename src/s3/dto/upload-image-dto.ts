import { IsInt, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  folder: string;

  @IsInt()
  id: number;
}
