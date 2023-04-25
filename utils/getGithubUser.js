const getGithubUser = async (access_token) => {
  const response = await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const result = await response.json();
  console.log(result);
  if (response.status !== 200) {
    throw new Error(result.message);
  }
  // if (has_user_email_scope) {
  //   const emailResponse = await fetch(`https://api.github.com/user/emails`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });
  //   const emailResult = await emailResponse.json();
  //   if (emailResponse.status !== 200) {
  //     console.log(result.error);
  //     throw new Error(result.error.message);
  //   }

  // }
  return result;
};

exports.getGithubUser = getGithubUser;
