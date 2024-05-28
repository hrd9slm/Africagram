/*
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const prisma = new PrismaClient();
// Commenting on a post
app.post("/posts/:id/comments", async (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.body.userId;
    const commentText = req.body.comment;
  
    // Authenticate the user (optional)
    // You can add your own authentication logic here
  
    try {
      // Find the post
      const post = await prisma.publication.findUnique({
        where: { id: postId },
      });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // Create a new comment
      const newComment = await prisma.commentaire.create({
        data: {
          text: commentText,
          utilisateurId: userId,
          postId: postId,
        },
      });
  
      // Fetch the updated post data
      const updatedPost = await prisma.publication.findUnique({
        where: { id: postId },
        include: { commentaires: true },
      });
  
      // Send the updated post data
      return res.status(201).json(updatedPost);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while commenting on the post" });
    }
  });
*/
