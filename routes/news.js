const getNews = require("../src/controllers/news");
const express = require('express');
const router = express.Router();


router.get("/:subject", (req, res) => {
  let subject = req.params.subject;
  getNews(res, subject);
});

module.exports = router;