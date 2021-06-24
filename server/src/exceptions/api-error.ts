export default class ApiError extends Error {
  public status: number;

  public errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не найден');
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }
}
