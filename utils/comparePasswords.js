const bcrypt = require('bcrypt'); // Ensure bcrypt is installed
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

const prisma = new PrismaClient(); // Initialize Prisma client

async function comparePasswords(plainPassword, email) {
  // Retrieve the hashed password from the database for the given user ID
  const user = await prisma.utilisateur.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Compare the plain text password with the hashed password from the database
  return bcrypt.compare(plainPassword, user.password);
}

module.exports = {comparePasswords};
