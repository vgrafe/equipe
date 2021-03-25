import AppLayout from "components/AppLayout";
import Head from "components/Head";
import Issue from "components/Issue";
import PageHeader from "components/PageHeader";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { useIssues, useOrgMilestones } from "utils/fetchers";
import Burndown from "components/Burndown";
import { setHours, formatDistanceToNow, parseISO, addDays } from "date-fns";

const Milestone = () => {
  const router = useRouter();

  const milestoneTitle = decodeURIComponent(router.query.title);

  const { data: milestones } = useOrgMilestones(router.query.org);

  const currentMilestones = milestones?.filter(
    (m) => m.title === milestoneTitle
  );

  const dueDates = currentMilestones && [
    ...new Set(currentMilestones.map((m) => m.due_on)),
  ];

  let uniqueDueDate;
  if (dueDates?.length === 1)
    try {
      uniqueDueDate = setHours(parseISO(dueDates[0]), 18);
    } catch (e) {
      // the due date is not the same accross milestones!
    }

  const { data: issues, isFetching } = useIssues(
    `org:"${router.query.org}" milestone:"${milestoneTitle}" sort:updated`
  );

  if (!issues) return <Spinner />;

  const openIssues = issues.filter((a) => a.state === "open");
  const closedIssues = issues.filter((a) => a.state === "closed");

  const progress =
    closedIssues.length / (closedIssues.length + openIssues.length);

  return (
    <>
      <Head title={"Milestone - " + milestoneTitle} />
      <PageHeader
        subheading={
          "milestone" +
          (uniqueDueDate
            ? ` - due in ${formatDistanceToNow(uniqueDueDate)}`
            : "")
        }
        heading={milestoneTitle}
        progress={progress}
      />
      {isFetching ? (
        <Spinner />
      ) : (
        openIssues?.length > 0 && (
          <div className="space-y-4">
            {uniqueDueDate && (
              <Burndown
                startDate={addDays(uniqueDueDate, -11)}
                endDate={uniqueDueDate}
                issues={issues}
              />
            )}
            <hr className="my-4" />
            <h2 className="text-xl">Open issues</h2>
            {openIssues.map((issue) => (
              <Issue key={issue.id} issue={issue} hideMilestone />
            )) || <p>no issues assigned yet</p>}
          </div>
        )
      )}
    </>
  );
};

Milestone.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Milestone;
