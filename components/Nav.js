import Link from "next/link";

import {
  useOrgMembers,
  useOrgs,
  useOrgTeams,
  useOrgProjects,
  useOrgMilestones,
} from "utils/fetchers";
import { useRouter } from "next/router";
import PicAndName from "./PicAndName";
import { Fragment, useState } from "react";
import ProjectIcon from "svg/project.svg";
import MilestoneIcon from "svg/milestone.svg";
import Card from "./Card";
import Spinner from "./Spinner";

const Nav = () => {
  const router = useRouter();

  const [expandedMenu, setExpandedMenu] = useState();

  const { data: orgs, isFetching: fetchingOrgs } = useOrgs();
  const { data: members, isFetching: fetchingMembers } = useOrgMembers(
    router.query.org
  );
  const { data: teams, isFetching: fetchingTeams } = useOrgTeams(
    router.query.org
  );
  const { data: projects, isFetching: fetchingProjects } = useOrgProjects(
    router.query.org
  );
  const {
    data: orgMilestones,
    isFetching: fetchingMilestones,
  } = useOrgMilestones(router.query.org);

  const milestones = orgMilestones && [
    ...new Set(orgMilestones.map((m) => m.title)),
  ];

  return (
    <Card as="nav" className="w-64 space-y-2 self-start">
      <>
        <div
          onClick={() =>
            expandedMenu === "orgs"
              ? setExpandedMenu(null)
              : setExpandedMenu("orgs")
          }
          className="h-8 rounded p-1 flex cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-full mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <p>Organizations</p>
        </div>
        {expandedMenu === "orgs" && (
          <div className="ml-4">
            {fetchingOrgs ? (
              <Spinner />
            ) : (
              orgs?.map((org) => (
                <Link
                  key={org.login}
                  href="/orgs/[org]"
                  as={`/orgs/${org.login}`}
                >
                  <div className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3">
                    <a>
                      <div className="flex items-center space-x-2 px-1">
                        {org && (
                          <img
                            src={org.avatar_url}
                            className="h-6 w-6 rounded-full"
                          />
                        )}
                        <span>{org.login}</span>
                      </div>
                    </a>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
        <hr />
      </>
      <>
        <div
          onClick={() =>
            expandedMenu === "projects"
              ? setExpandedMenu(null)
              : setExpandedMenu("projects")
          }
          className="h-8 rounded p-1 flex cursor-pointer"
        >
          <ProjectIcon className="h-full mr-2" />
          <p>Projects</p>
        </div>
        {expandedMenu === "projects" && (
          <div className="ml-4">
            {fetchingProjects ? (
              <Spinner />
            ) : (
              projects?.map((project, i) => (
                <Link
                  key={project.number}
                  href="/orgs/[org_name]/projects/[id]"
                  as={`/orgs/${router.query.org}/projects/${project.id}`}
                >
                  <div className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3">
                    <a>
                      <span>{project.name}</span>
                    </a>
                  </div>
                </Link>
              )) || <p>No open project was found.</p>
            )}
          </div>
        )}
        <hr />
      </>
      <>
        <div
          onClick={() =>
            expandedMenu === "milestones"
              ? setExpandedMenu(null)
              : setExpandedMenu("milestones")
          }
          className="h-8 rounded p-1 flex cursor-pointer"
        >
          <MilestoneIcon className="h-full mr-2" />
          <p>Milestones</p>
        </div>
        {expandedMenu === "milestones" && (
          <div className="ml-4">
            {fetchingMilestones ? (
              <Spinner />
            ) : (
              milestones?.map((milestone, i) => (
                <Link
                  key={i}
                  href="/orgs/[org_name]/milestones/[id]"
                  as={`/orgs/${
                    router.query.org
                  }/milestones/${encodeURIComponent(milestone)}`}
                >
                  <div className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3">
                    <a>
                      <span>{milestone}</span>
                    </a>
                  </div>
                </Link>
              )) || <p>No open milestones found.</p>
            )}
          </div>
        )}
        <hr />
      </>
      <>
        <div
          onClick={() =>
            expandedMenu === "teams"
              ? setExpandedMenu(null)
              : setExpandedMenu("teams")
          }
          className="h-8 rounded p-1 flex cursor-pointer"
        >
          <svg
            className="h-full mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p>Teams</p>
        </div>
        {expandedMenu === "teams" && (
          <div className="ml-4">
            {fetchingTeams ? (
              <Spinner />
            ) : (
              teams
                .filter((childTeam) => !childTeam.parent)
                .sort((a, b) => a.name < b.name)
                .map((team) => (
                  <Fragment key={team.slug}>
                    <Link
                      href="/orgs/[org]/team/[slug]"
                      as={`/orgs/${router.query.org}/team/${team.slug}`}
                    >
                      <div className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3">
                        <a>{team.name}</a>
                      </div>
                    </Link>
                    {teams
                      .filter(
                        (childTeam) => childTeam.parent?.name === team.name
                      )
                      .map((ct) => (
                        <Link
                          href="/orgs/[org]/team/[slug]"
                          key={ct.slug}
                          as={`/orgs/${router.query.org}/team/${ct.slug}`}
                        >
                          <div className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3">
                            <a className="block ml-4">{ct.name}</a>
                          </div>
                        </Link>
                      ))}
                  </Fragment>
                )) || <p>No team found.</p>
            )}
          </div>
        )}
        <hr />
      </>
      <>
        <div
          onClick={() =>
            expandedMenu === "members"
              ? setExpandedMenu(null)
              : setExpandedMenu("members")
          }
          className="h-8 rounded p-1 flex cursor-pointer"
        >
          <svg
            className="h-full mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p>Members</p>
        </div>
        {expandedMenu === "members" && (
          <div className="ml-4">
            {fetchingMembers ? (
              <Spinner />
            ) : (
              members.map((member) => (
                <div
                  key={member.login}
                  className="hover:border-blue-400 border-blue-200 border-l pl-3 border-transparent duration-75 cursor-pointer py-3"
                >
                  <PicAndName pic={member.avatar_url} login={member.login} />
                </div>
              ))
            )}
          </div>
        )}
      </>
    </Card>
  );
};

export default Nav;
