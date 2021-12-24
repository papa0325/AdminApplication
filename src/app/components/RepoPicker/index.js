import React, { useCallback, useState } from "react";
import { getAccessTokenGitHub, removeAccessTokenGitHub } from "./accessToken";
import { Steps } from "./Steps";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_GITHUB_APP_CLIENT_ID =
  process.env.REACT_APP_GITHUB_APP_CLIENT_ID;

// https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
const githubScopes = ["repo", "read:org", "write:repo_hook"];

export function RepoPicker() {
  const [accessTokenGitHub, setAccessTokenGitHub] = useState(
    getAccessTokenGitHub()
  );

  const handleClickLogin = useCallback(() => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_APP_CLIENT_ID}&scope=${encodeURIComponent(
      githubScopes.join(",")
    )}&redirect_uri=${encodeURIComponent(
      `${REACT_APP_BASE_URL}/.netlify/functions/oauth-github`
    )}`;
  }, []);

  const handleLogOut = useCallback(() => {
    removeAccessTokenGitHub();
    setAccessTokenGitHub(undefined);
  }, []);

  return (
    <div>
      <h2>Pick a repository &amp; branch</h2>

      {!accessTokenGitHub ? (
        <button
          className="btn btn-secondary d-flex align-items-center"
          onClick={handleClickLogin}
        >
          <img src="/media/svg/logos/github-1.svg" height="24" alt="" />{" "}
          <span className="ml-3">GitHub</span>
        </button>
      ) : (
        <>
          <Steps onLogOut={handleLogOut} />
        </>
      )}
    </div>
  );
}
