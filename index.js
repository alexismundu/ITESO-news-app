const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const routes = require("./routes");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

routes(app);

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});

