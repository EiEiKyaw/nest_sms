export class GeneralFailResponseDto {
  status: string;
  message: string;
  data: null;

  constructor(message = 'Operation fail') {
    this.status = 'fail';
    this.message = message;
  }
}
