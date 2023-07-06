import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
  statusCode: any;
  constructor(message : any) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default  BadRequestError;
