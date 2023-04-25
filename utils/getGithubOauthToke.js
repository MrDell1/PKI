require("dotenv").config();
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const getGithubOauthToke = async (code) => {
  const rootURl = "https://github.com/login/oauth/access_token";
  const options = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    accept: "json",
  };

  const response = await fetch(rootURl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(options),
  });
  const result = await response.json();
  if (response.status === 200) {
    return result;
  } else {
    console.log("Failed to fetch Google Oauth Tokens");
    throw new Error(result.error);
  }
};
exports.getGithubOauthToke = getGithubOauthToke;
