const express = require("express");
require("dotenv").config();
// const routeUser=require('./routes/UserRoutes');
// const routeAuth=require('./routes/AuthRoutes');
const routes = require("./routes");


const app = express();
app.use(express.json());
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.routAuth);
app.use("/", routes.routeFollower);
app.use("/api", routes.routeUser);
app.use("/posts", routes.postRouter);
app.use("/upload", routes.uplodeImageRouter);
app.use("/post/like", routes.likesRouter);
app.use("/post/comment", routes.commentsRouter);
app.use("/statistics", routes.routeStatics);


app.use((err, req, res, next) => {
  res.status(400).json(err.message);
});
const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}....`);
});
