const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const Joi = require('joi');

class UserController {
    constructor(){
        this.registerPattern=joi.object({
            name: Joi.string().min(5).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
          });
          this.loginPattern = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
          });
    }
    registerUser(req, res) {
      const { name, email, password } = req.body;

      res.send('User registered');
    }
  
    loginUser(req, res) {
      const { email, password } = req.body;
      // Login logic here
      res.send('User logged in');
    }
  
    logoutUser(req, res) {
      // Logout logic here
      res.send('User logged out');
    }
  }
  
  module.exports = new UserController();
  