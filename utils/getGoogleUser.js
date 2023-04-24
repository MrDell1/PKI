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
  if (response.ok) {
    return data;
  } else {
    console.log(err);
    throw Error(err);
  }
}

exports.getGoogleUser = getGoogleUser;
