const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uplodeImageRouter = require("./routes/uplodeImages");
const postRouter = require("./routes/PostRoutes");
const likesRouter = require("./routes/LikesRoutes");
const commentsRouter = require("./routes/CommentRoutes");

app.use(express.static("public"));
app.use(uplodeImageRouter);
app.use(postRouter);
app.use(likesRouter);
app.use(commentsRouter);

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  res.status(400).json(err.message);
});
/*
app.use((err,req,res,next)=>{
      err.statusCode = err.statusCode  500 
      err.status = err.status  "error"
      res.status(err.statusCode).json({
          statusCode : err.statusCode,
          status :err.status,
          message:err.message,
          stack : err.stack
      })
  })
*/
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}....`);
});
