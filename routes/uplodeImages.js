const express = require("express");
const uplodeImageRouter = express.Router();
const upload = require("../middlewares/uplode-images");

// Route for uploding image
uplodeImageRouter.post(
  "/upload",
  upload.single("Image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      res.send("File uploaded successfully.");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
);

module.exports = uplodeImageRouter;
