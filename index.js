const express = require("express");
const fs = require("fs");
const path = require("path");
const { createImportSpecifier } = require("typescript");
const newsRoute = require("./routes/news");

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const indexFile = fs.readFileSync("./views/index.html");
  res.end(indexFile);
});

newsRoute(app);

app.listen(3000, () => {
  console.log("App is running in port 3000");
});
