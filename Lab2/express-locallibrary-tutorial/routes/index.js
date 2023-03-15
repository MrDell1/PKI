var express = require("express");
const fs = require('fs')
const { use } = require("./dane");
var router = express.Router();
var i = 0;
const dir = './uploads/'
const filesArray = [];
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err
  }
  files.forEach(file => {
    filesArray.push(file);
    console.log(file)
  })
})

/* GET home page. */
router.get("/", function (req, res, next) {

  console.log(filesArray);

  i++;
  req.app.locals.ii++;
  ii++;
  req.session.views = (req.session.views || 0) + 1;
  res.render("index", {
    title: "Express",
    method: req.method,
    ip: req.ip,
    hostname: req.hostname,
    accept: req.get("Accept"),
    local_var: i,
    global_var1: ii,
    global_var2: req.app.locals.ii,
    counter: req.session.views,
    username: req.session.username,
    chat: global.chat,
    files: filesArray,
  });
});

router.get("/signIn", function (req, res, next) {
  res.render("signIn", { error: false });
});

router.get("/signOut", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

router.post("/signIn/login", function (req, res, next) {
  const username = req.body.username;
  const pass = req.body.pass;
  if (username === "admin" && pass === "admin") {
    req.session.username = username;
    res.redirect("/");
  }
  if (username === "user" && pass === "user") {
    req.session.username = username;
    res.redirect("/");
  } else {
    res.render("signIn", { error: true });
  }
});

router.post("/chat", function (req, res, next) {
  global.chat.push({
    username: req.session.username,
    msg: req.body.msg,
  });
  res.redirect("/");
});

router.post("/uploadFiles", function (req, res, next) {
  console.log(req.files);
  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    let file = req.files.file;
    file.mv("./uploads/" + file.name);
    res.send({
      status: true,
      message: "File is uploaded",
      data: {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
  }
});

router.get("/download", function(req, res, next) {
  const file = `./uploads/${req.query.name}`;
  res.download(file);
})

router.get("/:name/:age", function (req, res, next) {
  res.send(req.params);
});

module.exports = router;
