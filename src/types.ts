import { Response } from 'express';

export interface JWTPayload {
    id: string;
    username: string;
    roles: string[];
}

export interface CustomResponse<T> extends Response {
    locals: T;
}

export interface RBACCheck<T> {
    (requesting: JWTPayload, requested: T);
}
