import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

type MultipleMessagesError = {
  error: string;
  message: string[];
  statusCode: number;
};

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception.getResponse();

    let errors: string[];
    if (exceptionResponse instanceof String)
      errors = [exceptionResponse as string];
    else errors = (exceptionResponse as MultipleMessagesError).message;

    response.status(status).json({
      statusCode: status,
      errors,
    });
  }
}
