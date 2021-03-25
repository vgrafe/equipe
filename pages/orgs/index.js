import AppLayout from "components/AppLayout";
import { useOrgs } from "utils/fetchers";
import Missing from "svg/missing.svg";
import Spinner from "components/Spinner";
import Head from "components/Head";
import Link from "next/link";

const AppIndex = () => {
  const { data: orgs, isFetching, error } = useOrgs();

  return (
    <>
      <Head />
      {isFetching ? (
        <Spinner />
      ) : error ? (
        <p>some error happened.</p>
      ) : orgs.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-xl space-y-4">
          {orgs?.map((org) => (
            <Link key={org.login} href="/orgs/[org]" as={`/orgs/${org.login}`}>
              <div className="px-4 py-2 rounded bg-gray-100 bg-opacity-75 cursor-pointer hover:bg-opacity-100">
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
          ))}
        </div>
      ) : (
        <div className="text-center justify-center flex flex-col items-center space-y-4 h-full">
          <p>You have no organization on GitHub.</p>
          <Missing className="w-64 mb-12" />
          <p>
            Teamwise is designed to use GitHub organizations activity at least
            for now. Thanks for checking us out, and think of us if you join an
            organization managed on GitHub in the future!
          </p>
        </div>
      )}
    </>
  );
};

AppIndex.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default AppIndex;
