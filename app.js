const express = require("express");
require("dotenv").config({ path: "./config.env" });

const routes = require("./routes/index");

const app = express();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT} port!`);
});
