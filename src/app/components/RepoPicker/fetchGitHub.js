import { getAccessTokenGitHub } from "./accessToken";

export const fetchGitHub = async (query, variables) => {
  const access_token = getAccessTokenGitHub();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });

  // TODO: Error handling?

  const data = await res.json();

  return { res, data };
};
