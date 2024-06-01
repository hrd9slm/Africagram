
const { StatusCodes } = require('http-status-codes');
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'bad request!';
    this.statusCode = StatusCodes.BAD_REQUEST;
    //console.log(this.statusCode);
  }
  
}

module.exports = BadRequestError;