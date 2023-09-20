import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';

interface CustomResponse<T> {
  result: T;
  statusCode: number;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next
      .handle()
      .pipe(map((result: T) => ({ statusCode: response.statusCode, result })));
  }
}
