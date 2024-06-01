const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

const addNewPost = async (req, res) => {
  try {
    const schema = Joi.object({
      caption: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new post
    const userId = req.user.id;
    const newPost = await prisma.Publication.create({
      data: {
        caption: req.body.caption,
        utilisateur_id: userId
      },
      select: {
        id: true,
        caption: true,
        date_creation: true,
        date_modification: true,
        utilisateur_id: true,
        image_url: true,
      },
    });

    // Send the newly created post data
    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the post" });
  }
};

const getTheletestPostes = async (req, res) => {
  try {
    const skipCount = +req.params.pageNum * 5; // Number of posts to skip
    const takeCount = 5; // Number of posts to take
    // Find the lastes postes

    // Send the lastes postes // Find the latest posts with a limit of 5
    const lastPosts = await prisma.Publication.findMany({
      orderBy: {
        date_creation: "desc", // Order by creation date in descending order
      },
      skip: skipCount, // Skip the last 5 posts
      take: takeCount, // Take the next 5 posts
      select: {
        id: true,
        caption: true,
        date_creation: true,
        date_modification: true,
        utilisateur_id: true,
        image_url: true,
      },
    });

    // Send the lastes postes
    return res.status(200).json({
      message: "Lastest postes",
      postes: lastPosts,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while geting the post" });
  }
};
const updatePostImageUrl = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await prisma.Publication.findUnique({
      where: {
        id: postId,
        utilisateur_id: userId,
      },
    });
    if (post) {
      const img = "img/" + req.file.filename;
      await prisma.Publication.update({
        where: { id: postId },
        data: { image_url: img },
      });
      res.send("File uploaded successfully.");
    } else {
      res.status(404).send("You don't have any post with that id.");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
module.exports = { addNewPost, getTheletestPostes, updatePostImageUrl };
