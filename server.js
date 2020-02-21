const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes here
module.exports = function(app) {
  app.get("/api/images", function(req, res) {
    db.Image.find({}).then(function(dbImages) {
      res.json(dbImages);
    });
  });

  app.get("/api/images/:id", function(req, res) {
    db.Image.findById(req.params.id).then(function(dbImage) {
      res.json(dbImage);
    });
  });


  app.put("/api/images/:id", function(req, res) {
    db.Image.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function(dbImage) {
      res.json(dbImage);
    });
  });
};

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
