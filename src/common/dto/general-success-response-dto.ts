export class GeneralSuccessResponseDto<T> {
  status: string;
  message: string;
  data: T;

  constructor(data: T, message = 'Operation successful') {
    this.status = 'success';
    this.message = message;
    this.data = data;
  }
}
