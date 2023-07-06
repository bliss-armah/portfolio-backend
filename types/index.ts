import { Request } from "express";
declare module Express {
  export interface Request {
    user: string;
    // etc.
  }
}
export interface CustomExpressRequest extends Request {
  user?: any;
}

export interface IreqPayload {
  userId: String;
  iat: Number;
  exp: Number;
}
