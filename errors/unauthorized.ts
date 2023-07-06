import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnauthorizedError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
