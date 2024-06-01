const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");



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
    // Check if the user has already liked the post
    const existingLike = await prisma.Aime.findFirst({
      where: {
        AND: [
          { utilisateur_id: req.body.utilisateur_id },
          { post_id: req.params.id },
        ],
      },
    });

    if (existingLike) {
      // User has already liked the post
      return res.status(409).json({ error: "User has already liked this post" });
    }
    // Update the likes count
    const newAime = await prisma.Aime.create({
      data: {
        utilisateur_id: req.body.utilisateur_id,
        post_id: req.params.id,
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
