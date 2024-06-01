const { StatusCodes } = require('http-status-codes');
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'not found';
    this.statusCode = StatusCodes.NOT_FOUND;
    console.log(this.statusCode);
  }
  
}

module.exports = NotFound;