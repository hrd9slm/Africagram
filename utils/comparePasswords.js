const bcrypt = require('bcrypt'); 
const { PrismaClient } = require('@prisma/client'); 

const prisma = new PrismaClient();

const comparePasswords=(password,hashpassword)=>bcrypt.compare(password, hashpassword)

module.exports = {comparePasswords};
