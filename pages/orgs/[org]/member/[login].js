import AppLayout from "components/AppLayout";
import Head from "components/Head";
import MemberCard from "components/MemberCard";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { useMember } from "utils/fetchers";

const Member = () => {
  const router = useRouter();

  const { data: member } = useMember(router.query.login);

  if (!member) return <Spinner />;

  return (
    <>
      <Head title={"Member - " + member.login} />
      <MemberCard pic={member.avatar_url} name={member.login} />
    </>
  );
};

Member.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Member;
