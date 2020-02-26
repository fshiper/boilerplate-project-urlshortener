"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan"); // logger
const cors = require("cors");
const app = express();
const api = require('./api');

app.set("port", process.env.PORT || 8081);

// Basic Configuration
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', api)


app.use("/public", express.static(process.cwd() + "/public"));
app.use(morgan("dev"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");

  app.listen(app.get("port"), function() {
    console.log("API Server Listening on port " + app.get("port") + "!");
  });
});
