const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");
const addNewPost = async (req, res) => {
  try {
    /* const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }
  
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const userId = decodedToken.id;
      */

    const schema = Joi.object({
      caption: Joi.string().required(),
      utilisateur_id: Joi.string().required(),
    });
    console.log(req.body);

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new post
    const newPost = await prisma.Publication.create({
      data: req.body,
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
    // Find the lastes postes

    // Send the lastes postes
    const lastPostes = await prisma.Publication.findMany({
      orderBy: {
        date_creation: "desc",
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

    // Send the lastes postes
    return res.status(200).json({
      message: "Lastest postes",
      postes: lastPostes,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while geting the post" });
  }
};
module.exports = { addNewPost, getTheletestPostes };
