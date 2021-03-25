import { useRouter } from "next/router";
import {
  useIssueEvents,
  useIssueLabels,
  useProjectsData,
} from "utils/fetchers";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";

import ProjectIcon from "svg/project.svg";
import MilestoneIcon from "svg/milestone.svg";
import WarningIcon from "svg/warning.svg";
import RepoIcon from "svg/repo.svg";
import Link from "next/link";
import Label from "./Label";
import PicAndName from "./PicAndName";
import PullIcon from "svg/pull.svg";
import IssueIcon from "svg/issue.svg";
import Card from "./Card";

const urlToRepoIssue = (url) => {
  const [repo, , id] = url.split("/").slice(5);
  return { repo, id };
};

const Issue = ({
  issue,
  hideMilestone,
  hideProject,
  hideAssignees,
  hideClosure,
}) => {
  const daysWithoutUpdate = ~~(
    (new Date() - new Date(issue.updated_at)) /
    (1000 * 60 * 60 * 24)
  );

  const router = useRouter();

  const { repo, id } = urlToRepoIssue(issue.url);

  const issueKey = `${repo}#${id}`;

  const { data: labels } = useIssueLabels(router.query.org, repo, id);

  const { data: issuesProjects } = useProjectsData(router.query.org);

  const issueProjects = issuesProjects && issuesProjects[issueKey];

  const { data: events, isFetching: fetchingEvents } = useIssueEvents(
    router.query.org,
    repo,
    id
  );

  const assignEvents = events?.filter((e) =>
    ["review_requested", "assignee"].includes(e.event)
  );

  const firstAssign = events?.find((e) => e.event === "assigned");

  const submissionEvent = events?.find((e) => e.event === "review_requested");

  const closureEvent = events?.find((e) => e.event === "closed");

  const workTime =
    firstAssign &&
    submissionEvent &&
    differenceInHours(
      new Date(firstAssign.created_at),
      new Date(submissionEvent.created_at)
    );

  const reviewDuration =
    submissionEvent &&
    differenceInHours(
      new Date(issue.closed_at),
      new Date(submissionEvent.created_at)
    );

  const reviewDurationLabel =
    reviewDuration > 24
      ? `${~~(reviewDuration / 24)} days`
      : reviewDuration > 7
      ? `1 day`
      : reviewDuration > 1
      ? `${reviewDuration} hours`
      : null;

  const lastAssign =
    assignEvents &&
    assignEvents.length > 1 &&
    assignEvents[assignEvents.length - 1]
      ? assignEvents[assignEvents.length - 1]
      : null;

  const daysSinceFirstAssignment =
    firstAssign &&
    differenceInDays(new Date(), new Date(firstAssign.created_at));

  const daysSinceLastAssignment =
    lastAssign && differenceInDays(new Date(), new Date(lastAssign.created_at));

  let warnings = [];

  const isPullRequest = issue.pull_request;
  const isOpen = issue.state !== "closed";

  if (isOpen && daysWithoutUpdate > 3)
    warnings.push(`${daysWithoutUpdate} days without update`);

  if (isOpen && daysSinceFirstAssignment > 1)
    warnings.push(`first assigned ${daysSinceFirstAssignment} days ago`);

  if (isOpen && daysSinceLastAssignment > 1)
    warnings.push(`last re-assign ${daysSinceLastAssignment} days ago`);

  return (
    <Card className="py-2 px-4 space-y-2 bg-white relative">
      <div className="space-x-2">
        {isPullRequest ? (
          <PullIcon
            className={
              (isOpen ? "text-green-600" : "text-purple-500") +
              " fill-current w-5 h-5 inline-block"
            }
          />
        ) : (
          <IssueIcon
            className={
              (isOpen ? "text-green-600" : "text-red-600") +
              " fill-current w-5 h-5 inline-block mb-1"
            }
          />
        )}
        <a
          target="_blank"
          href={issue.html_url}
          className="text-lg font-medium text-blue-600"
        >
          {issue.title}
        </a>
        {labels?.map((label, i) => (
          <Label color={label.color} key={i} text={label.name} />
        ))}
      </div>
      <div className="flex">
        <RepoIcon className="w-5 mr-2 opacity-75" />
        <span>
          {repo} #{id}
        </span>
      </div>
      {issue.milestone && !hideMilestone && (
        <div className="flex">
          <MilestoneIcon className="w-5 mr-2" />
          <Link
            href="/orgs/[org]/milestones/[title]"
            as={`/orgs/${router.query.org}/milestones/${encodeURIComponent(
              issue.milestone.title
            )}`}
          >
            <a>{issue.milestone.title}</a>
          </Link>
        </div>
      )}
      {issueProjects && !hideProject && (
        <div className="flex">
          <ProjectIcon className="w-5 mr-2" />
          {issueProjects.map((project, i) => (
            <a key={i} href={project.html_url} target="_blank">
              <span key={project.id}>{project.name}</span>
            </a>
          ))}
        </div>
      )}
      {warnings.map((warning, i) => (
        <div key={i} className="flex text-red-600">
          <WarningIcon className="w-5 mr-2" />
          <p>{warning}</p>
        </div>
      ))}
      {issue.state === "closed" && reviewDurationLabel && (
        <div className="flex text-orange-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>reviewed in {reviewDurationLabel}</p>
        </div>
      )}
      {closureEvent && !isOpen
        ? !hideClosure && (
            <div className="flex space-x-2">
              <span>Closed by </span>
              <PicAndName
                login={closureEvent.actor.login}
                pic={closureEvent.actor.avatar_url}
              />
            </div>
          )
        : issue.assignees?.length > 0 &&
          !hideAssignees && (
            <div className="flex space-x-2">
              <span>Assigned to </span>
              {issue.assignees.map((member) => (
                <PicAndName
                  key={member.login}
                  login={member.login}
                  pic={member.avatar_url}
                />
              ))}
            </div>
          )}
    </Card>
  );
};

export default Issue;
