const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../utils/hashPassword");
const { comparePasswords } = require("../utils/comparePasswords");
const { generateToken } = require("../utils/jwt");
const prisma = new PrismaClient();
const Joi = require("joi");

const UserController = {
  registerPattern: Joi.object({
    firstname: Joi.string().min(5).max(30).required(),
    lastname: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  loginPattern: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  registerUser: async (req, res) => {
    const { error } = UserController.registerPattern.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { firstname, lastname, email, password } = req.body;

    try {
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
    } catch (error) {
      console.error("Error registering new user:", error);
    }
    res.send("User registered");
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.utilisateur.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("Utilisateur introuvable");
      }

      const isMatch = await comparePasswords(password, email);
      console.log(isMatch);

      if (!isMatch) {
        throw new Error("Mot de passe incorrect");
      }
      const token = generateToken(user);
      console.log("token", token);
      return res.send([user, token]);
    } catch (error) {
      console.error(error.message);
      return res.send(error.message);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.utilisateur.findMany();
      res.json(users);
    } catch (err) {
      res.status(500).send("Error retrieving users");
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { error } = UserController.registerPattern.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { firstname, lastname, email, password } = req.body;
    const userId = req.user.id;

    if (id !== userId) {
      return res.status(403).send("You are not authorized to update this user");
    }

    try {
      const hashedPassword = await hashPassword(password);
      const user = await prisma.utilisateur.update({
        where: { id },
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });
      res.status(200).send(" user updated");
    } catch (err) {
      res.status(500).send("Error updating user");
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (id !== userId) {
      return res.status(403).send("You are not authorized to delete this user");
    }
    try {
      await prisma.utilisateur.delete({ where: { id } });
      res.send("User deleted successfully");
    } catch (err) {
      res.status(500).send("Error deleting user");
    }
  },
};

module.exports = UserController;
