import { BadRequestException, ValidationError } from '@nestjs/common';
import { MessageError } from '../entities/response.entity';
import { Errors } from './error.dictionary';

const getException = (exceptions: ValidationError[]): MessageError[] => {
  return exceptions.map(({ property, constraints, children }) => {
    if (children && children.length > 0) {
      return {
        field: property,
        children: getException(children),
      };
    }
    return {
      field: property,
      message: Object.values(constraints).join(', '),
      validation: Object.keys(constraints).join(', '),
      constraints,
    };
  });
};

const exceptionFactory = (exceptions: ValidationError[]): void => {
  throw new BadRequestException({
    status: Errors.VALIDATION_ERROR.status,
    description: Errors.VALIDATION_ERROR.description,
    errors: getException(exceptions),
  });
};

export { exceptionFactory };
