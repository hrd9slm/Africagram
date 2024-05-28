const express = require("express");
const uplodeImageRouter = express.Router();
const Joi = require("joi");
const upload = require("../middlewares/uplode-images");

// Define Joi schema for validating the request body
const imageSchema = Joi.object({
  fieldname: Joi.required(),
  originalname: Joi.required(),
});

uplodeImageRouter.post("/upload", upload.single("Image"), async (req, res) => {
  console.log(req.body);
  const { error } = await imageSchema.validate(req.file);
  if (error) {
    console.log("hi i'm an error");
    return res.status(400).send(error.details[0].message);
  } else {
    res.send("Images uploaded successfully.");
  }
});

module.exports = uplodeImageRouter;
