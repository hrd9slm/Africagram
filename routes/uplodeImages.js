const express = require("express");
const uplodeImageRouter = express.Router();
const upload = require("../middlewares/uplode-images");

uplodeImageRouter.post("/upload", upload.single("Image"), (req, res) => {
  res.send("Images téléchargées avec succès.");
});

module.exports = uplodeImageRouter;
