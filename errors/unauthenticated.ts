import { StatusCodes } from 'http-status-codes'
import CustomAPIError from "./custom-api";

class UnauthenticatedError extends CustomAPIError {
  statusCode : any
  constructor(message :any) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
