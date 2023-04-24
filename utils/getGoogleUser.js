async function getGoogleUser(id_token, access_token) {
  const { data } = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );
  const result = await response.json();
  console.log(result, response);
  if (response.status === 200) {
    return result;
  } else {
    console.log(result.error);
    throw new Error(result.error);
  }
}

exports.getGoogleUser = getGoogleUser;