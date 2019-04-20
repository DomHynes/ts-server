import { Response, Request } from 'express';
import { User } from './entities/User';

export interface JWTPayload {
  id: string;
  username: string;
  roles: string[];
}

export interface CustomResponse<T> extends Response {
  locals: T;
}
export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface AuthenticatedServiceRequest<T> extends AuthenticatedRequest {
  account: T;
}

export interface DiscordProfile {
  username: string;
  verified: boolean;
  locale: string;
  mfa_enabled: boolean;
  id: string;
  flags: number;
  avatar: string;
  discriminator: string;
  email: string;
  provider: string;
  accessToken: string;
  fetchedAt: Date;
}

export interface RBACCheck<T> {
  (requesting: JWTPayload, requested: T);
}
