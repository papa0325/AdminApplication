import Cookies from "js-cookie";

const cookieName = "accessTokenGitHub";

export const getAccessTokenGitHub = () => Cookies.get(cookieName);

export const removeAccessTokenGitHub = () => Cookies.remove(cookieName);
