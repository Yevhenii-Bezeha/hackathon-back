import { HttpStatuses } from '../common/index.js';

class ResponseError {
  constructor(message, status = HttpStatuses.ERROR) {
    this.message = message;
    this.status = status;
  }

  [toString]() {
    return this.message;
  }
}

export default ResponseError;
