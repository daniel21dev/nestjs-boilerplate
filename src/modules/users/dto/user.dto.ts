import { User } from '@prisma/client';

export class UserDto implements Omit<User, 'id'> {
  name: string;
  email: string;
  password: string;
}
