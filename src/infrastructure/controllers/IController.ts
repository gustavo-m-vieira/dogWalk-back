import type { Request } from 'express';

export interface IController {
  handle(httpRequest: Request): Promise<{ statusCode: number; body: any }>;
}
