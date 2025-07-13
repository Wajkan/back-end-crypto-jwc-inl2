export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status = 'Bad Request, missing information';
        break;
      case 401:
        this.status = 'Unauthorized, please login';
        break;
      case 403:
        this.status = 'Unauthorized, missing authorization';
        break;
      case 404:
        this.status = 'Not Found, could not find the resource you are looking for';
        break;
      case 405:
        this.status = 'Unauthorized method';
        break;
      case 409:
        this.status = 'Conflict, resource already exists';
        break;
      case 415:
        this.status = 'Missing support for this media type';
        break;
      case statusCode.toString().startsWith('5'):
        this.status = 'Internal Server Error';
        break;
      default:
        this.status = 'Something went wrong, unknown error code';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
