const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const isAdminMiddleware = async (req, res, next) => {
  const { id, email } = req.user;

  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id: id },
    });

    if (user && user.isAdmin) {
      req.user = { id };
      next();
    } else {
      res.status(403).send("Access denied. Admins only.");
    }
  } catch (err) {
    console.error(err);

    res.status(500).send("Error checking admin status");
  }
};

module.exports = isAdminMiddleware;
