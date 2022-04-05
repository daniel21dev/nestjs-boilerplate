import { User } from 'src/modules/users/entities/user.entity';
import { apiResponses } from '../entities/responses.entity';

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
  REGISTER_USER: {
    status: 201,
    description: 'User Registered successfully.',
    type: User,
  },
});
