import { ApiResponse } from '../entities/response.entity';

export class ControlledError extends Error {
  public e: ApiResponse;
  constructor(e: ApiResponse, message = '') {
    super();
    this.message = message;
    this.e = e;
  }
}
