require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);
app.listen(PORT, () => console.log("Listening to port", PORT));
