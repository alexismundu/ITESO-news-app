const express = require("express");
const fs = require("fs");
const path = require("path");
const { createImportSpecifier } = require("typescript");
const routes = require("./routes");

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

routes(app);

app.listen(3000, () => {
  console.log("App is running in port 3000");
});
