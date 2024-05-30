const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const StatisticsController = {
  check: async (req, res) => {
    const { id } = req.user;

    try {
      const user = await prisma.utilisateur.findUnique({
        where: {
          id: id,
        },
      });

      res.json({ title: "you are admin:", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error Admin user");
    }
  },
};

module.exports = StatisticsController;
