const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require('../utils/hashPassword');
const { comparePasswords } = require('../utils/comparePasswords');
const { generateToken,verifyToken} = require('../utils/jwt');
const prisma = new PrismaClient();
const Joi = require('joi');


const AuthController= {
  registerPattern : Joi.object({
    firstname: Joi.string().min(5).max(30).required(),
    lastname: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
 
    loginPattern : Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(6).required()
   }),

 registerUser: async(req, res)=> {
    
     const { error } = AuthController.registerPattern.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
   const { firstname,lastname,email,password  } = req.body;

 
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
       console.error('Error registering new user:', error);
   }
   res.send('User registered');
   },
 
  loginUser:async(req, res) =>{
      const { email, password } = req.body;
       try {
        
         const user = await prisma.utilisateur.findUnique( 
           {where: {
           email,
         },
       });
     
         if (!user) {
           throw new Error('Utilisateur introuvable');
         }
     
        
         const isMatch = await comparePasswords(password,email);
         console.log(isMatch);
     
         if (!isMatch) {
           throw new Error('Mot de passe incorrect');
         }
         const token = generateToken(user);
         console.log("token",token);
         return res.send([user,token]);
       } catch (error) {
         console.error(error.message);
         return res.send(error.message);
        
       }
    
    },

    authenticateUser:(req, res, next)=> {
      const authHeader = req.headers['authorization'];
      const token = authHeader  
        verifyToken(token);
        
        return res.send("you are authenteficate")
     
    }
   
}

module.exports = AuthController;
