import AppLayout from "components/AppLayout";
import Head from "components/Head";
import MemberCard from "components/MemberCard";
import PageHeader from "components/PageHeader";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { useTeam, useTeamMembers } from "utils/fetchers";

const TeamStatus = () => {
  const router = useRouter();

  const { data: team } = useTeam(router.query.org, router.query.slug);

  const { data: members } = useTeamMembers(router.query.org, router.query.slug);

  if (!team) return <Spinner />;

  return (
    <>
      <Head title={"Team - " + team.slug} />
      <PageHeader subheading="team" heading={team.name} />
      <MemberCard
        isTeam
        pic={team.avatar_url}
        name={`${router.query.org}/${team.slug}`}
      />
      {members?.map((member, i) => (
        <MemberCard
          key={i}
          key={member.login}
          pic={member.avatar_url}
          name={member.login}
        />
      ))}
    </>
  );
};

TeamStatus.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default TeamStatus;
