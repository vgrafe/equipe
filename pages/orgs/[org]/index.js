import AppLayout from "components/AppLayout";
import Velocity from "components/Velocity";
import Head from "components/Head";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { useIssues } from "utils/fetchers";

const OrgHome = () => {
  const router = useRouter();

  let daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - 14);
  const dateString = `${daysAgo.getFullYear()}-${(daysAgo.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${daysAgo.getDate().toString().padStart(2, "0")}`;

  const { data: closedIssues, isFetching, error } = useIssues(
    `org:${router.query.org} closed:>${dateString}`
  );

  if (isFetching) return <Spinner />;

  if (closedIssues?.length > 0)
    return (
      <>
        <Head title={router.query.org} />
        <Velocity closedIssues={closedIssues} />
      </>
    );

  if (error)
    return (
      <p>
        An error occured while fetching your organization's recent activity.
        This can happen if your organization does not have any repositories.
      </p>
    );

  return <p>No recent activity found.</p>;
};

OrgHome.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default OrgHome;
