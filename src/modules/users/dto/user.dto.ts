import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto implements Omit<User, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
