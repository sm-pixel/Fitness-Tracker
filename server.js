const express = require("express");
const mongojs = require("mongojs");
const morgan = require("morgan");

const PORT = 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "";
const collections = [""];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send(index.html);
});

//Listening on PORT...
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}!`);
  });