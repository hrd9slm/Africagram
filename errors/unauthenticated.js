const { StatusCodes } = require('http-status-codes');
class Unauthenticated extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthenticated';
    this.statusCode = StatusCodes.Unauthenticated;
    console.log(this.statusCode);
  }
  
}

module.exports = Unauthenticated;