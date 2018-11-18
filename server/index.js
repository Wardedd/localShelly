const express = require("express");
const cors = require("cors");
const { executeSync, executeAsync } = require("./commands.js");
require("dotenv").config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sync", (req, res) => {
  console.log(req.body.commands);
  res.json({ result: executeSync([].concat(req.body.commands)) });
});

app.listen(process.env.CLIENT_PORT, () =>
  console.log("Listening on " + process.env.CLIENT_PORT)
);
