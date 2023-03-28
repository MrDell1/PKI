const { json } = require("express");
var express = require("express");
const fs = require('fs')
const { use } = require("./score");
var router = express.Router();

router.post("/webresources/RestService", function (req, res, next) {
  const response = {Hello: "Word"};
  if(req.body.name){
    response.Hello = req.body.name;
  }
  res.json(response);
});

module.exports = router;
