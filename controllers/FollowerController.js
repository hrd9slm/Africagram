const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const followersController = {
  followUser: async (req, res) => {
    const userId = req.user.id;
    const followingId = req.params.id;

    if (userId === followingId) {
      return res.status(400).send("You cannot follow yourself");
    }

    try {
      const existingFollow = await prisma.follower.findFirst({
        where: {
          follower_id: userId,
          following_id: followingId,
        },
      });

      if (existingFollow) {
        return res.status(400).send("You are already following this user");
      }

      const newFollow = await prisma.follower.create({
        data: {
          follower_id: userId,
          following_id: followingId,
        },
      });

      res.json(newFollow);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error following user");
    }
  },

  getFollowers: async (req, res) => {
    const { userId } = req.user;
    //console.log(".........userId=",userId,"............req.user=",req.user.id)

    try {
      const followers = await prisma.follower.findMany({
        where: { following_id: userId },
        include: { follower: true },
      });

      res.json(followers);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching followers");
    }
  },
};

module.exports = followersController;
