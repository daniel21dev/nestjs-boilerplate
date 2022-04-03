import Response, {
  ApiResponse,
  ValidationError,
} from '../entities/response.entity';

function errorsType<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}

export const Errors = errorsType({
  VALIDATION_ERROR: {
    status: 400,
    description: 'Validation error.',
    type: ValidationError,
  },
  UNKNOWN_ERROR: {
    status: 500,
    description: 'Unknown error.',
    type: Response,
  },
  UNAUTHORIZED: {
    status: 401,
    description: 'Unauthorized.',
    type: Response,
  },
  USER_NOT_FOUND: {
    status: 404,
    description: 'user not found',
    type: Response,
  },
  EMAIL_NOT_AVAILABLE: {
    status: 400,
    description: 'the email is already registered',
    type: Response,
  },
});

export const NotTypeError = (error: ApiResponse): Omit<ApiResponse, 'type'> => {
  if (error.type) delete error.type;
  return error;
};
