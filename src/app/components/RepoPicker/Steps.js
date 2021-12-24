import React, { useState, useCallback, useEffect } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import {
  queryOrgRepos,
  queryMyRepos,
  queryBranches,
  querySearchRepos,
  queryOrgs,
} from "./queries";
import { fetchGitHub } from "./fetchGitHub";

import { Step } from "./Step";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_GITHUB_APP_SLUG = process.env.REACT_APP_GITHUB_APP_SLUG;

const renderRepoItem = ({ item }) => (
  <div className="d-flex justify-content-between w-100">
    {item.name}{" "}
    {item.isPrivate ? (
      <span>
        <img src="/media/svg/icons/General/Lock.svg" alt="" /> Private
      </span>
    ) : (
      ""
    )}
  </div>
);

export function Steps({ onLogOut }) {
  const [step, setStep] = useState("init");
  const [owner, setOwner] = useState();
  const [viewer, setViewer] = useState();
  const [isOwnerMe, setIsOwnerMe] = useState(true);
  const [repo, setRepo] = useState();
  const [orgs, setOrgs] = useState([]);
  const [branch, setBranch] = useState();
  const [repoKeyword, setRepoKeyword] = useState("");
  const [hasError, setHasError] = useState();
  const [error, setError] = useState();

  const handleClickReset = useCallback(() => {
    setIsOwnerMe(true);
    setOwner(undefined);
    setRepo(undefined);
    setBranch(undefined);
    setRepoKeyword("");
    setHasError(undefined);
    setError(undefined);
    setStep("init");
  }, []);

  const handleClickMe = useCallback(
    (e) => {
      handleClickReset();

      setIsOwnerMe(true);

      setOwner(viewer);
    },
    [viewer, handleClickReset]
  );

  const handleClickOrg = useCallback(
    (e, { item: clickedOrg }) => {
      handleClickReset();

      setIsOwnerMe(false);

      const { login, avatarUrl } = clickedOrg;

      setOwner({
        login,
        avatarUrl,
      });
    },
    [handleClickReset]
  );

  const handleClickRepo = useCallback((e, { item: clickedRepo }) => {
    setRepo(clickedRepo);
    setStep("branches");
  }, []);

  const handleClickBranch = useCallback(
    (e, { item: branch }) => {
      (async () => {
        setBranch(branch);

        try {
          const res = await fetch(
            `${REACT_APP_BASE_URL}/.netlify/functions/repo-add`,
            {
              method: "POST",
              body: JSON.stringify({
                owner: owner?.login,
                repo: repo?.name,
                branch: branch?.name,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (!res.ok) {
            setHasError(true);

            try {
              setError({ message: await res.text() });
            } catch {}
          }
        } catch (error) {
          setHasError(true);
        }

        setStep("done");
      })();
    },
    [owner, repo]
  );

  const handleChangeRepoKeyword = useCallback((e) => {
    setRepoKeyword(e.target.value);
  }, []);

  useEffect(() => {
    if (step !== "init") return;

    (async () => {
      try {
        const { res, data } = await fetchGitHub(queryOrgs);

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            onLogOut();
            return;
          }

          setHasError(true);
          setError({ message: "Unknown error" });
        }

        const { login, avatarUrl } = data.data.viewer;

        setViewer({
          login,
          avatarUrl,
        });

        setOwner({
          login,
          avatarUrl,
        });

        setOrgs(data.data.viewer.organizations.edges.map((edge) => edge.node));
      } catch (error) {}
    })();
  }, [step, onLogOut]);

  const configureGitHubAppLink = (
    <a
      href={`https://github.com/apps/${REACT_APP_GITHUB_APP_SLUG}/installations/new`}
    >
      Configure the WithCanvas app on GitHub.
    </a>
  );

  if (error) {
    return (
      <>
        There was an error, please try clearing your session data and try again
        or come back later.
      </>
    );
  }

  if (!viewer) {
    return (
      <div className="d-flex justify-content-center p-2">
        <Spinner animation="border" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              <img
                src={owner?.avatarUrl}
                alt=""
                height="20"
                width="20"
                className="mr-2"
              />{" "}
              {owner?.login}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isOwnerMe ? null : (
                <>
                  <Dropdown.Item onClick={handleClickMe}>
                    <img
                      src={viewer.avatarUrl}
                      alt=""
                      height="20"
                      width="20"
                      className="mr-2"
                    />
                    {viewer.login}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}
              {orgs?.length ? (
                <>
                  {orgs.map((org) => (
                    <Dropdown.Item
                      key={org.id}
                      onClick={(e) => handleClickOrg(e, { item: org })}
                    >
                      <img
                        src={org.avatarUrl}
                        alt=""
                        height="20"
                        width="20"
                        className="mr-2"
                      />
                      {org.login}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                </>
              ) : null}
              <Dropdown.Item
                href={`https://github.com/apps/${REACT_APP_GITHUB_APP_SLUG}/installations/new`}
              >
                Don't see your organization?
                <br />
                Configure the WithCanvas app on GitHub.
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="ml-3 d-flex align-items-center">
            {repo?.name} {branch?.name ? <>@ {branch?.name}</> : null}
          </div>
        </div>

        {step === "init" && (
          <div>
            <DebounceInput
              value={repoKeyword}
              onChange={handleChangeRepoKeyword}
              debounceTimeout={300}
              placeholder="Search"
              className="form-control my-3"
            />
          </div>
        )}
      </div>

      {step === "init" && (
        <>
          {owner && (
            <>
              {repoKeyword ? (
                <Step
                  typePlural="repositories"
                  query={querySearchRepos}
                  variables={{
                    query: `${
                      // TODO: Ensure proper escaping.
                      repoKeyword.replace(/:/g, "\\:")
                    } in:name ${isOwnerMe ? "user" : "org"}:${owner.login}`,
                  }}
                  getConnection={(data) => data.data.search}
                  handleEvent={handleClickRepo}
                  onLogOut={onLogOut}
                >
                  {renderRepoItem}
                </Step>
              ) : isOwnerMe ? (
                <Step
                  typePlural="repositories"
                  query={queryMyRepos}
                  getConnection={(data) => data.data.viewer.repositories}
                  handleEvent={handleClickRepo}
                  onLogOut={onLogOut}
                >
                  {renderRepoItem}
                </Step>
              ) : (
                <Step
                  typePlural="repositories"
                  query={queryOrgRepos}
                  variables={{ owner: owner?.login }}
                  getConnection={(data) => data.data.organization.repositories}
                  handleEvent={handleClickRepo}
                  onLogOut={onLogOut}
                >
                  {renderRepoItem}
                </Step>
              )}
              <div className="my-3">
                Don't see your repository? {configureGitHubAppLink}
              </div>
            </>
          )}
        </>
      )}
      {step === "branches" && (
        <>
          <Step
            typePlural="branches"
            query={queryBranches}
            variables={{
              owner: owner?.login,
              name: repo?.name,
            }}
            getConnection={(data) => data.data.repository.refs}
            handleEvent={handleClickBranch}
            onLogOut={onLogOut}
          >
            {({ item }) => item.name}
          </Step>
          <div className="my-3">
            Don't see your branch? {configureGitHubAppLink}
          </div>
        </>
      )}
      {step === "done" && (
        <div>
          {hasError ? (
            <div>
              {error && error.message
                ? `Error: ${error.message}`
                : "Unknown error."}
            </div>
          ) : (
            <h3>Done!</h3>
          )}
        </div>
      )}
      {step !== "init" && (
        <div className="my-3">
          <button className="btn btn-secondary" onClick={handleClickReset}>
            Start over
          </button>
        </div>
      )}
      {step === "init" && (
        <div className="my-3">
          <button className="btn btn-secondary" onClick={onLogOut}>
            Sign out
          </button>{" "}
          Want to use a different account? Sign out at{" "}
          <a href="https://github.com">GitHub</a>.
        </div>
      )}
    </>
  );
}
