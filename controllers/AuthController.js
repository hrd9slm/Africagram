
const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require('../utils/hashPassword');
const { comparePasswords } = require('../utils/comparePasswords');
const { generateToken, verifyToken } = require('../utils/jwt');
const prisma = new PrismaClient();
const Joi = require('joi');
const BadRequestError = require('../errors/bad-request');
const NotFound = require('../errors/not-found');


const AuthController = {
  registerPattern: Joi.object({
    firstname: Joi.string().max(30).required(),
    lastname: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  loginPattern: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  }),

  registerUser: async (req, res) => {

    const { error } = AuthController.registerPattern.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { firstname, lastname, email, password } = req.body;


    try {

      const user = await prisma.utilisateur.findUnique(
        {
          where: {
            email,
          },
        });

      if (user) {
        throw new BadRequestError('This email is not valid , try an other one');
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.Utilisateur.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });

      console.log(`New user registered: ${newUser.name} (${newUser.email})`);
      res.send('User registered');
    } catch (error) {
      console.error('Error registering new user:', error);
      return res.status(error.statusCode).json({ message: error.message });
    }

  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {

      const user = await prisma.utilisateur.findUnique(
        {
          where: {
            email,
          },
        });

      if (!user) {
        //throw new Error('User unfounded');
        throw new NotFound('User unfounded');
      }


      const isMatch = await comparePasswords(password, user.password);
      console.log(isMatch);

      if (!isMatch) {
        throw new BadRequestError('name or email incorrect!');
      }
      const token = generateToken(user);
      console.log("token", token);
      res.setHeader('Authorization', `Bearer ${token}`);
      return res.send({ user, token });
    } catch (error) {
      console.error(error.message);
      return res.status(error.statusCode).json({ message: error.message });

    }

  },

  authenticateUser: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (verifyToken(token) != null) {
      console.log("verifyToken true", verifyToken);
      res.send("You are authenticated");

    } else {
      res.status(401).send("You are not authenticated");
      console.log("verifyToken else", verifyToken(token));
    }


  }

}

module.exports = AuthController;
