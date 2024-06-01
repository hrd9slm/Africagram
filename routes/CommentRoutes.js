const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const commentsRouter = express.Router();

// Commenting on a post
commentsRouter.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    const commentText = req.body.comment;

    // Authenticate the user (optional)
    // You can add your own authentication logic here

    try {
        // Find the post
        const post = await prisma.Publication.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Create a new comment
        const newComment = await prisma.commentaire.create({
            data: {
                message: commentText,
                utilisateur_id: userId,
                post_id: postId,
            },
        });

        // Send the updated post data
        return res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred while commenting on the post" });
    }
});
module.exports = commentsRouter;
