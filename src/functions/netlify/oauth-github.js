const fetch = require("node-fetch");

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_GITHUB_APP_CLIENT_ID =
  process.env.REACT_APP_GITHUB_APP_CLIENT_ID;
const GITHUB_APP_CLIENT_SECRET = process.env.GITHUB_APP_CLIENT_SECRET;

// Based on example 7 here: https://functions-playground.netlify.app/

// https://docs.netlify.com/functions/build-with-javascript/#format

exports.handler = async (event, context, callback) => {
  // TODO: Error handling?

  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (typeof code !== "string") return;

  const url = new URL("https://github.com/login/oauth/access_token");
  const params = {
    client_id: REACT_APP_GITHUB_APP_CLIENT_ID,
    client_secret: GITHUB_APP_CLIENT_SECRET,
    redirect_uri: `${REACT_APP_BASE_URL}/.netlify/functions/oauth-github`, // Or configured in GitHub OAuth app.
    code,
  };

  Object.entries(params).forEach((entry) => url.searchParams.append(...entry));

  const fetchRes = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await fetchRes.json();

  const { access_token } = data;

  callback(null, {
    statusCode: 302,
    headers: {
      Location: `${REACT_APP_BASE_URL}/builds`,
      "Set-Cookie": `accessTokenGitHub=${encodeURIComponent(
        access_token
      )}; Path=/`, // TODO: set expires/max-age, etc.? otherwise it's a session cookie
    },
  });
};
