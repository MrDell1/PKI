const { json } = require("express");
var express = require("express");
var router = express.Router();
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const googleOauthHandler =
  require("../controller/googleOauthHandler.js").googleOauthHandler;
let connection = require("../database").databaseConnection;

router.get("/oauth/google", googleOauthHandler);

router.post("/signin", function (req, res, next) {
  check(req.body.email, "Wrong email").isEmail();
  check(req.body.password, "Wrond password").isLength({ min: 2 });

  connection.query(
    ` SELECT idusers, username, email, password, roles.role FROM users LEFT JOIN roles ON roles.idrole = users.role WHERE users.email=${connection.escape(
      req.body.email
    )}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!result.length) {
        return res.status(401).send({
          error: "Email or password is incorrect!",
        });
      }
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              error: bErr,
            });
          }
          if (bResult) {
            console.log(result[0].idusers);
            const token = jwt.sign({ id: result[0].idusers }, "rsa", {
              expiresIn: "1h",
            });
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            error: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

router.post("/signup", function (req, res, next) {
  check(req.body.username, "Username is requied").not().isEmpty(),
    check(req.body.email, "Wrong email").isEmail();
  check(req.body.password, "Wrond password").isLength({ min: 2 });

  connection.query(
    ` SELECT * FROM users WHERE users.email=${connection.escape(
      req.body.email
    )} OR users.username=${connection.escape(req.body.username)}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      if (result.length) {
        return res.status(401).send({
          error: "This user is already in use!",
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        connection.query(
          `INSERT INTO users (username, email, password, provider) VALUES (${connection.escape(
            req.body.username
          )}, ${connection.escape(req.body.email)}, '${hash}', 'local')`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send({
                error: err,
              });
            }

            return res.status(201).send({
              msg: "The user has been registerd with us!",
            });
          }
        );
      });
    }
  );
});
module.exports = router;
