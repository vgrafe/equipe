import AppLayout from "components/AppLayout";
import Head from "components/Head";
import Issue from "components/Issue";
import PageHeader from "components/PageHeader";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { useIssues, useProject } from "utils/fetchers";

const Milestone = () => {
  const router = useRouter();

  const { data: project } = useProject(router.query.id);

  const {
    data: issues,
    isFetching,
  } = useIssues(
    `project:"${router.query.org}/${project?.number}" sort:updated`,
    { enabled: !!project }
  );

  if (!issues) return <Spinner />;

  const openIssues = issues.filter((a) => a.state === "open");
  const closedIssues = issues.filter((a) => a.state === "closed");

  const progress =
    closedIssues.length / (closedIssues.length + openIssues.length);

  return (
    <>
      <Head title={"Project - " + project.name} />
      <PageHeader
        subheading="milestone"
        heading={project.name}
        url={`https://github.com/orgs/${router.query.org}/projects/${project.number}`}
        progress={progress}
      />
      {isFetching ? (
        <Spinner />
      ) : (
        openIssues?.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xl">Open issues</h2>
            {openIssues.map((issue) => (
              <Issue key={issue.id} issue={issue} hideProject />
            )) || <p>no issues assigned yet</p>}
          </div>
        )
      )}
    </>
  );
};

Milestone.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Milestone;
