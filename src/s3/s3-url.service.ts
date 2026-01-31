import { Injectable } from '@nestjs/common';

@Injectable()
export class S3UrlService {
  private readonly baseUrl: string;

  constructor() {
    if (!process.env.S3_BUCKET_NAME || !process.env.AWS_REGION) {
      throw new Error('S3_BUCKET_NAME and AWS_REGION must be defined in .env');
    }
    this.baseUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  }

  getFullUrl(relativePath: string): string {
    if (!relativePath) return '';
    const key = relativePath.startsWith('/')
      ? relativePath.substring(1)
      : relativePath;
    return `${this.baseUrl}/${key}`;
  }
}
