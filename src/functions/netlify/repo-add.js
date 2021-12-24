const fetch = require("node-fetch");
const cookie = require("cookie");

// Based on example 7 here: https://functions-playground.netlify.app/

// https://docs.netlify.com/functions/build-with-javascript/#format

const CLOUD_FUNCTION_REPOSYNC_URL = process.env.CLOUD_FUNCTION_REPOSYNC_URL;
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

exports.handler = async (event, context, callback) => {
  const cookies = cookie.parse(event.headers.cookie);

  const { accessTokenGitHub } = cookies;

  if (typeof accessTokenGitHub !== "string")
    return { statusCode: 400, body: "Must have access token." };

  if (typeof event.body !== "string")
    return { statusCode: 400, body: "Must post body." };

  // TODO: Error handle parse?
  const payload = JSON.parse(event.body);

  const { owner, repo, branch } = payload;

  if (typeof owner !== "string")
    return { statusCode: 400, body: "Must post owner." };

  if (typeof repo !== "string")
    return { statusCode: 400, body: "Must post repo." };

  if (typeof branch !== "string")
    return { statusCode: 400, body: "Must post branch." };

  // https://developer.github.com/v3/repos/hooks/#create-a-repository-webhook
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/hooks`);

  // TODO: Error handling?

  await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessTokenGitHub}`,
    },
    body: JSON.stringify({
      events: ["push"],
      config: {
        url: CLOUD_FUNCTION_REPOSYNC_URL,
        content_type: "json",
        secret: GITHUB_WEBHOOK_SECRET,
      },
    }),
  });

  callback(null, {
    statusCode: 200,
    body: "ok",
  });
};
