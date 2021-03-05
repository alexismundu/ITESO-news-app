const newsRoutes = require('./news');

module.exports = function(app){
    app.use('/news', newsRoutes);

    app.get("/", (req, res) => {
        const indexFile = fs.readFileSync("./views/index.html");
        res.end(indexFile);
      });
}