const getGoogleOauthToken =
  require("../utils/getGoogleOauthToken.js").getGoogleOauthToken;
const getGoogleUser = require("../utils/getGoogleUser.js").getGoogleUser;
const jwt = require("jsonwebtoken");

const googleOauthHandler = async (req, res, next) => {
  // Get the code from the query
  const code = req.query.code;
  try {
    if (!code) {
      return next(new Error("Authorization code not provided!", 401));
    }

    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken(code);

    // Use the token to get the User
    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    // Check if user is verified
    if (!verified_email) {
      return next(new AppError("Google account not verified", 403));
    }

    // Update user if user already exist or create new user
    connection.query(
      ` SELECT idusers, username, email, provider, roles.role FROM users LEFT JOIN roles ON roles.idrole = users.role WHERE users.email=${connection.escape(
        email
      )}`,
      (err, result) => {
        if (err) {
          return res.status(400).send({ error: err });
        }

        if (!result.length) {
          connection.query(
            `INSERT INTO users (username, email, provider) VALUES (${connection.escape(
              name
            )}, ${connection.escape(email)}, 'google')`,
            (err) => {
              if (err) {
                console.log(err);
                return res.status(400).send({
                  error: err,
                });
              }
              connection.query(
                ` SELECT idusers, username, email, provider, roles.role FROM users LEFT JOIN roles ON roles.idrole = users.role WHERE users.email=${connection.escape(
                  email
                )}`,
                (err, resultSignUp) => {
                  if (err) {
                    return res.status(400).send({ error: err });
                  }
                  const token = jwt.sign(
                    { id: resultSignUp[0].idusers },
                    "rsa",
                    {
                      expiresIn: "1h",
                    }
                  );
                  return res.status(200).send({
                    msg: "Logged in!",
                    token,
                    user: resultSignUp[0],
                  });
                }
              );
            }
          );
        }
        if (result[0].provider !== "google") {
          return res.status(400).send({ error: "It's not google account" });
        }
        const token = jwt.sign({ id: result[0].idusers }, "rsa", {
          expiresIn: "1h",
        });
        return res.status(200).send({
          msg: "Logged in!",
          token,
          user: result[0],
        });
      }
    );
  } catch (error) {
    console.log("Failed to authorize Google User", error);
    console.log(error);
    return res.status(400).send({ error: error });
  }
};

exports.googleOauthHandler = googleOauthHandler;