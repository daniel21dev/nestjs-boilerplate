import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Errors } from './error.dictionary';
import { ControlledError } from '../entities/controlledError.entiti';

@Catch()
export class ErrorsFilter<T> implements ExceptionFilter {
  private logger = new Logger(ErrorsFilter.name);

  catch(exception: T, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception);

    if (exception instanceof ControlledError) {
      const { errorResponse, message } = exception;
      return response
        .status(errorResponse.status)
        .send({ ...errorResponse, message });
    }

    return response
      .status(Errors.UNKNOWN_ERROR.status)
      .json(Errors.UNKNOWN_ERROR);
  }
}
