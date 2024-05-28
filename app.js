const express = require("express");
require("dotenv").config();
const app = express();
const uplodeImageRouter = require("./routes/uplodeImages");
app.use(express.static("public"));
app.use(uplodeImageRouter);

const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}....`);
});
