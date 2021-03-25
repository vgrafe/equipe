import AppLayout from "components/AppLayout";
import Button from "components/Button";
import Card from "components/Card";
import Head from "components/Head";
import Spinner from "components/Spinner";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useUserStatus } from "utils/fetchers";

const BETA_PHASE = true;

const Account = () => {
  const router = useRouter();

  // const { data: status, isFetching, error } = useUserStatus();
  let status, isFetching, error;

  useEffect(() => {
    // if (error) router.replace("/");
  }, [error]);

  const goToStripePortal = async () => {
    fetch("/api/get-portal-session", { method: "post" })
      .then((a) => a.json())
      .then(({ portalUrl }) => (window.location.href = portalUrl));
  };

  // if (isFetching) return <Spinner />;

  return (
    <Card className="text-center mt-12 space-y-3">
      <Head title="Your account" />
      {BETA_PHASE ? (
        <>
          <h2 className="text-xl">Pretty empty, I know!</h2>
          <h2 className="text-xl">More to come here soon:</h2>
          <ul className="space-y-4">
            <li>
              <span className="mr-2">🔢</span>manage custom tags to define
              effort (points)
            </li>
            <li>
              <span className="mr-2">📅</span> define your iterations (sprints
              or others)
            </li>
            <li>
              Do you have any feature suggestion?
              <a href="mailto:contact@teamwise.app">
                email me at contact@teamwise.app
              </a>
              !
            </li>
          </ul>
        </>
      ) : status.active ? (
        <>
          {status.label === "trial" ? (
            <>
              <p>You have {status.daysLeft} days left in your trial!</p>
              <p>
                You can subscribe{" "}
                <Link href="/subscribe">
                  <a>here</a>
                </Link>
              </p>
            </>
          ) : (
            <div>
              <Button onClick={goToStripePortal}>
                Update or cancel your plan
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {status.label === "trial_expired" && (
            <p>Your trial period is over!</p>
          )}
          {status.label === "cancelled" && <p>Your are not subscribed!</p>}
          <p>
            You can subscribe{" "}
            <Link href="/subscribe">
              <a>here</a>
            </Link>
          </p>
        </>
      )}
      <button
        className="rounded bg-blue-600 text-gray-100 px-2 py-1 shadow m-12"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        sign out
      </button>
    </Card>
  );
};

Account.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default Account;
