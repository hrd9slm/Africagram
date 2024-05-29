const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const Joi = require("joi");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const prisma = new PrismaClient();

const addNewLike = async (req, res) => {
  const schema = Joi.object({
    utilisateur_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Find the post
    const post = await prisma.Publication.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the likes count
    const newAime = await prisma.Aime.create({
      data: {
        utilisateurId: req.body.utilisateur_id,
        postId: req.params.id,
      },
    });

    // Send the updated post data
    return res.status(201).json(newAime);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while liking the post" });
  }
};

module.exports = { addNewLike };
