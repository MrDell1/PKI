var OAuth2Data = require("../google_key.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const getGoogleOauthToken = async (code) => {
  const rootURl = "https://oauth2.googleapis.com/token";
  console.log(code);
  const options = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URL,
    grant_type: "authorization_code",
  };

  const response = await fetch(rootURl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(options),
  });
  const result = await response.json();
  console.log(result, response);
  if (response.status === 200) {
    return result;
  } else {
    console.log("Failed to fetch Google Oauth Tokens");
    throw new Error(result.error);
  }
};
exports.getGoogleOauthToken = getGoogleOauthToken;
