// https://developer.github.com/v4/explorer/

export const queryOrgs = `
query ($cursor: String) {
  viewer {
    login
    avatarUrl
    organizations(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          login
          avatarUrl
        }
      }
    }
  }
}
`;

export const queryMyRepos = `
query ($cursor: String) {
  viewer {
    login
    repositories(first: 10, after: $cursor, orderBy: {field: NAME, direction: ASC}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          isPrivate
          owner {
            login
          }
        }
      }
    }
  }
}
`;

/**
 * https://docs.github.com/en/github/searching-for-information-on-github/searching-for-repositories
 */
export const querySearchRepos = `
query ($cursor: String, $query: String!) {
  viewer {
    login
  }
  search (first: 10, after: $cursor, type:REPOSITORY, query:$query) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on Repository {
          id
          name
          isPrivate
        }
      }
    }
  }
}
`;

export const queryOrgRepos = `
query ($cursor: String, $owner: String!) {
  organization(login: $owner) {
    repositories(first: 10, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          owner {
            login
          }
        }
      }
    }
  }
}
`;

export const queryBranches = `
query ($cursor: String, $name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    refs(first: 10, after: $cursor, refPrefix: "refs/heads/", ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          target {
            ... on Commit {
              oid
            }
          }
        }
      }
    }
  }
}
`;
