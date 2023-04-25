async function getGithubUser(has_user_email_scope, access_token) {
  const response = await fetch(
    `https://api.github.com/user?access_token=${access_token}`,
    {
      method: "GET",
    }
  );
  const result = await response.json();
  console.log(result);
  if (response.status !== 200) {
    console.log(result.error);
    throw new Error(result.error.message);
  }
  if (has_user_email_scope) {
    const emailResponse = await fetch(
      `https://api.github.com/user/emails?access_token=${access_token}`,
      {
        method: "GET",
      }
    );
    const emailResult = await emailResponse.json();
    if (emailResponse.status !== 200) {
      console.log(result.error);
      throw new Error(result.error.message);
    }
    return result;
  }
}

exports.getGithubUser = getGithubUser;
