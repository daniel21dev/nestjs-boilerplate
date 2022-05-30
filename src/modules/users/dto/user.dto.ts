import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto implements Omit<User, 'id' | 'role'> {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 30)
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @Length(6, 30)
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 30)
  password: string;
}
