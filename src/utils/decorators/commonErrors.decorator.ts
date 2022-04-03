import { ApiResponse } from '@nestjs/swagger';
import { NotTypeError, Errors } from '../error.dictionary';
import { applyDecorators } from '@nestjs/common';

export function CommonErrorsResponses() {
  return applyDecorators(
    ApiResponse(NotTypeError(Errors.VALIDATION_ERROR)),
    ApiResponse(NotTypeError(Errors.UNKNOWN_ERROR)),
    ApiResponse(NotTypeError(Errors.UNAUTHORIZED)),
  );
}
