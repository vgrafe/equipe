import { Octokit } from "@octokit/core";
import { getSession } from "next-auth/client";
import { useQuery } from "react-query";

export const urlToRepoIssue = (url) => {
  const [repo, , id] = url.split("/").slice(5);
  return { repo, id };
};

let _token;
const getOctokit = async () => {
  if (!_token) {
    _token = (await getSession()).user.githubAccessToken;
  }
  return new Octokit({
    auth: _token,
  });
};

export const clearToken = () => (_token = null);

export const useOrgs = () =>
  useQuery(["orgs"], () =>
    getOctokit().then((octokit) =>
      octokit.request("GET /user/orgs").then(({ data }) => data)
    )
  );

export const useNotifications = (enabled) =>
  useQuery(
    ["notifications"],
    () =>
      getOctokit().then((octokit) =>
        octokit.request("GET /notifications").then(({ data }) => data)
      ),
    {
      enabled,
      staleTime: 0,
      refetchOnWindowFocus: "always",
      refetchInterval: 30 * 1000,
    }
  );

export const useProject = (project_id) =>
  useQuery(
    ["project", project_id],
    async () => {
      const octokit = await getOctokit();

      const { data: projects } = await octokit.request(
        "GET /projects/:project_id",
        {
          project_id,
          headers: {
            accept: `application/vnd.github.inertia-preview+json`,
          },
        }
      );

      return projects;
    },
    {
      enabled: !!project_id,
    }
  );

export const useProjectsData = (org) =>
  useQuery(
    ["issuesProjects", org],
    async () => {
      const octokit = await getOctokit();

      const { data: projects } = await octokit.request(
        "GET /orgs/:org/projects",
        {
          org,
          headers: {
            accept: `application/vnd.github.inertia-preview+json`,
          },
        }
      );

      const projectsCards = await Promise.all(
        projects.map(async (project) => {
          const { data: columns } = await octokit.request(
            "GET /projects/:project_id/columns",
            {
              project_id: project.id,
              headers: {
                accept: `application/vnd.github.inertia-preview+json`,
              },
            }
          );

          let _result = await Promise.all(
            columns.map(async (column) => {
              const { data: colCards } = await octokit.request(
                "GET /projects/columns/:column_id/cards",
                {
                  column_id: column.id,
                  archived_state: "not_archived",
                  per_page: 100,
                  headers: {
                    accept: `application/vnd.github.inertia-preview+json`,
                  },
                }
              );
              return colCards;
            })
          );

          return { project, cards: _result.flat() };
        })
      );

      let _issuesProjects = {};
      for (const project of projects.map((p) => ({
        id: p.id,
        name: p.name,
        html_url: p.html_url,
      })) || []) {
        if (
          projectsCards &&
          projectsCards.find((pc) => pc.project.id === project.id)
        )
          for (const card of projectsCards
            .find((pc) => pc.project.id === project.id)
            .cards.filter((a) => a.content_url)) {
            const repoIssue = urlToRepoIssue(card.content_url);
            const key = `${repoIssue.repo}#${repoIssue.id}`;
            _issuesProjects[key] = _issuesProjects[key]
              ? [..._issuesProjects[key], project]
              : [project];
          }
      }

      return _issuesProjects;
    },
    {
      enabled: !!org,
    }
  );

export const useOrgMembers = (org) =>
  useQuery(
    ["members", org],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /orgs/:org/members", {
            org,
          })
          .then(({ data }) => data)
      ),
    {
      enabled: !!org,
    }
  );

export const useOrgTeams = (org) =>
  useQuery(
    ["teams", org],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /orgs/:org/teams", {
            org,
          })
          .then(({ data }) => data)
      ),
    {
      enabled: !!org,
    }
  );

export const useTeam = (org, team_slug) =>
  useQuery(
    ["team", org, team_slug],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /orgs/:org/teams/:team_slug", {
            org,
            team_slug,
          })
          .then(({ data }) => data)
      ),
    {
      enabled: org && team_slug,
    }
  );

export const useMember = (username) =>
  useQuery(
    ["member", username],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /users/:username", {
            username,
          })
          .then(({ data }) => data)
      ),
    {
      enabled: username,
    }
  );

export const useTeamMembers = (org, team_slug) =>
  useQuery(
    ["team members", org, team_slug],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /orgs/:org/teams/:team_slug/members", {
            org,
            team_slug,
          })
          .then(({ data }) => data)
      ),
    {
      enabled: org && team_slug,
    }
  );

export const useOrgProjects = (org) =>
  useQuery(
    ["projects", org],
    () =>
      getOctokit().then((octokit) =>
        octokit
          .request("GET /orgs/:org/projects", {
            org,
            headers: {
              accept: `application/vnd.github.inertia-preview+json`,
            },
          })
          .then(({ data }) => data)
      ),
    {
      enabled: !!org,
    }
  );

export const useOrgMilestones = (org) =>
  useQuery(
    ["milestones", org],
    () =>
      getOctokit().then(async (octokit) => {
        const { data: orgRepos } = await octokit.request(
          "GET /orgs/:org/repos",
          {
            org,
            headers: {
              accept: `application/vnd.github.inertia-preview+json`,
            },
            per_page: 100,
          }
        );

        const milestones = await Promise.all(
          orgRepos.map((repo) =>
            octokit
              .request("GET /repos/:owner/:repo/milestones", {
                owner: org,
                repo: repo.name,
                state: "open",
                headers: {
                  accept: `application/vnd.github.inertia-preview+json`,
                },
              })
              .then((result) =>
                result.data.map((milestone) => ({
                  ...milestone,
                  repo,
                }))
              )
          )
        );

        return milestones.flat();
      }),
    {
      enabled: !!org,
    }
  );
export const useIssues = (q) =>
  useQuery(["issues", q], () =>
    getOctokit().then(async (octokit) => {
      let results = [];
      let gotEverything = false;
      let page = 1;
      while (!gotEverything) {
        const { data: issues } = await octokit.request("GET /search/issues", {
          q,
          per_page: 100,
          page,
          headers: {
            accept: `application/vnd.github.starfox-preview+json`,
          },
        });

        results = [...results, ...issues.items];
        gotEverything = results.length >= issues.total_count;
        page++;
      }

      return results;
    })
  );

export const useIssueLabels = (owner, repo, issue_number) =>
  useQuery(["labels", owner, repo, issue_number], () =>
    getOctokit().then((octokit) =>
      octokit
        .request("GET /repos/:owner/:repo/issues/:issue_number/labels", {
          owner,
          repo,
          issue_number,
        })
        .then(({ data }) => data)
    )
  );

export const useIssueEvents = (owner, repo, issue_number) =>
  useQuery(["events", owner, repo, issue_number], () =>
    getOctokit().then((octokit) =>
      octokit
        .request("GET /repos/:owner/:repo/issues/:issue_number/events", {
          owner,
          repo,
          issue_number,
        })
        .then(({ data }) => data)
    )
  );
