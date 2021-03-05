const express = require("express");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

routes(app);

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});

MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, (err, client) => {
  if(err){
    console.log('Failed to connect to MongoDB', err);
    return;
  }
  const db = client.db();
  console.log('Successfully connected to MongoDB');
})