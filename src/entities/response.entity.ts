/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

class Response {
  @ApiProperty()
  status: number;

  @ApiProperty()
  description: string;
}

class ApiResponse {
  status: number;
  description: string;
  name?: string;
  type?: Type<unknown> | Function | [Function] | string | unknown[];
}

class ConstraintsError {
  [key: string]: string;
}

class MessageError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  validation?: string;

  @ApiPropertyOptional()
  constraints?: ConstraintsError;

  @ApiPropertyOptional({ type: [MessageError] })
  children?: Array<MessageError>;
}

class ValidationError {
  @ApiProperty({ type: [MessageError] })
  errors: Array<MessageError>;
}

export { ApiResponse, ValidationError, MessageError };
export default Response;
