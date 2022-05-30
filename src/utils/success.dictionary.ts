import { User } from '../modules/users/entities/user.entity';
import { apiResponses } from '../entities/responses.entity';
import { LoginResponse } from '../auth/entities/login-response';

export const Success = apiResponses({
  WELCOME_MESSAGE: {
    status: 200,
    description: 'Welcome message.',
  },
  GET_USERS: {
    status: 201,
    description: 'gets the users.',
    type: [User],
    isArray: true,
  },
  GET_PROFILE: {
    status: 200,
    description: 'gets the logged user.',
    type: User,
    isArray: true,
  },
  REGISTER_USER: {
    status: 201,
    description: 'User Registered successfully.',
    type: User,
  },
  UPDATE_USER: {
    status: 200,
    description: 'User updated successfully.',
    type: User,
  },
  LOGIN_USER: {
    status: 200,
    description: 'Returns a jwt access token.',
    type: LoginResponse,
  },
});
