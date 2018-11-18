const express = require("express");
const cors = require("cors");
const { executeSync, executeAsync } = require("./commands.js");
require("dotenv").config({ path: "../.env" });

const PORT = process.env.CLIENT_PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sync", (req, res) => {
  console.log(req.body.commands);
  res.json({ result: executeSync([].concat(req.body.commands)) });
});

app.listen(PORT, () => console.log("Listening on " + PORT));
