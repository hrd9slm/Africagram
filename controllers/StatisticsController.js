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
  getTotalUsers: async (req, res) => {
    try {
      const totalUsers = await prisma.utilisateur.count();
      res.json({ totalUsers });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving total users");
    }
  },

  getUsersByCountry: async (req, res) => {
    try {
      const usersByCountry = await prisma.profil.groupBy({
        by: ["pays"],
        _count: { _all: true },
      });
      res.json(usersByCountry);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving users by country");
    }
  },

  getAveragePostsPerUser: async (req, res) => {
    try {
      const totalUsers = await prisma.utilisateur.count();
      const totalPosts = await prisma.publication.count();
      const averagePostsPerUser = totalUsers > 0 ? totalPosts / totalUsers : 0;
      res.json({totalUsers:totalUsers,totalPosts:totalPosts, average:averagePostsPerUser });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving average posts per user");
    }
  },

  getGender: async (req, res) => {
    try {
      const genderDistribution = await prisma.profil.groupBy({
        by: ["sexe"],
        _count: { _all: true },
      });
      res.json(genderDistribution);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving gender distribution");
    }
  },
};

module.exports = StatisticsController;
