import { ApiResponse } from '../entities/response.entity';
import { User } from 'src/modules/users/entities/user.entity';

function succesType<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}

export const Success = succesType({
  WELCOME_MESSAGE: {
    status: 200,
    description: 'Welcome message.',
  },
  GET_USERS: {
    status: 201,
    description: 'gets the users.',
    type: [User],
  },
  REGISTER_USER: {
    status: 201,
    description: 'User Registered successfully.',
    type: User,
  },
});
