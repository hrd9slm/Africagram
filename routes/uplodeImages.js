const express = require("express");
const uplodeImageRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = require("../middlewares/uplode-images");

// Route for uploding image
uplodeImageRouter.post(
  "/upload/:postId",
  upload.single("Image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      const postId = req.params.postId;
      const post = await prisma.Publication.findUnique({
        where: { id: postId },
      });
      if (post) {
        const img = "img/" + req.file.filename;
        await prisma.Publication.update({
          where: { id: postId },
          data: { image_url: img },
        });
      }
      res.send("File uploaded successfully.");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
);

module.exports = uplodeImageRouter;
