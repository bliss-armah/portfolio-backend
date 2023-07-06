import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class NotFoundError extends CustomAPIError {
  statusCode: any;
  constructor(message :any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
