const express = require("express");
require("dotenv").config();
// const routeUser=require('./routes/UserRoutes');
// const routeAuth=require('./routes/AuthRoutes');
const routes = require("./routes");
const uplodeImageRouter = require("./routes/uplodeImages");
const postRouter = require("./routes/PostRoutes");
const likesRouter = require("./routes/LikesRoutes");
const commentsRouter = require("./routes/CommentRoutes");

const app = express();
app.use(express.json());
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

app.use(uplodeImageRouter);
app.use(postRouter);
app.use(likesRouter);
app.use(commentsRouter);

app.use("/api", routes.routeUser);
app.use("/", routes.routAuth);

app.use((err, req, res, next) => {
  res.status(400).json(err.message);
});
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}....`);
});
