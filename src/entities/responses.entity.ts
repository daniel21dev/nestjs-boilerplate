import { ApiResponse } from './response.entity';

export function apiResponses<T extends Record<string, ApiResponse>>(arg: T): T {
  return arg;
}
