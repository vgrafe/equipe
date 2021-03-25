import { useRouter } from "next/router";
import { useIssues } from "utils/fetchers";
import GithubLink from "./GithubLink";
import Issue from "./Issue";
import PicAndName from "./PicAndName";
import GithubIcon from "svg/github.svg";
import Spinner from "./Spinner";

const MemberCard = ({ pic, name, isTeam }) => {
  const router = useRouter();

  const query = isTeam ? "team-review-requested" : "assignee";

  const { data: assignments, refetch, isFetching } = useIssues(
    `${query}:${name.replace(" ", "-")}+is:open+org:${router.query.org}`
  );

  if (assignments?.length === 0) return null;

  return (
    <div className="mb-8 inline-block w-full">
      <div className="mb-2 flex items-center space-x-2">
        {!isTeam && (
          <div className="flex space-x-4 text-xl">
            <PicAndName pic={!isTeam && pic} login={name} />
          </div>
        )}
        <div className="flex-grow" />
        <GithubLink url={`/issues?q=${query}:${name}+is:open`}>
          <GithubIcon className="h-6 opacity-75 hover:opacity-100 hover:text-blue-500" />
        </GithubLink>
        <svg
          onClick={refetch}
          disabled={isFetching}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 cursor-pointer stroke-current opacity-75 hover:opacity-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <div className="space-y-3">
        {isFetching ? (
          <div className="text-center">
            <Spinner />{" "}
          </div>
        ) : assignments?.length > 0 ? (
          assignments
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map((issue) => (
              <Issue key={issue.id} issue={issue} hideAssignees />
            ))
        ) : (
          <div className="text-center">
            <p>No {isTeam ? `team` : ``} assignments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
