var express = require("express");
var router = express.Router();

router.get("/form", function (req, res) {
  res.send(req.query);
});

router.get("/", function (req, res) {
  req.app.locals.ii++;
  ii++;
  res.render("dane", { global_var1: ii, global_var2: req.app.locals.ii });
});

router.post("/", function (req, res) {
  //res.render("index", { title: "Express" });
  res.send(req.body);
});

module.exports = router;
