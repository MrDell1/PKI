var express = require("express");
const { use } = require("./dane");
var router = express.Router();
var i = 0;
/* GET home page. */
router.get("/", function (req, res, next) {
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
  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let file = req.files.file;

    //Use the mv() method to place the file in the upload directory (i.e. "uploads")
    file.mv("./uploads/" + file.name);

    //send response
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

router.get("/:name/:age", function (req, res, next) {
  res.send(req.params);
});

module.exports = router;
