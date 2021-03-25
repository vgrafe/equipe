// import { useSession } from "next-auth/client";
import Nav from "./Nav";
import Header from "./Header";
// import TrialEndPaywall from "./TrialEndPaywall";
import Footer from "./Footer";
// import { useRouter } from "next/router";

const AppLayout = ({ hideNav, children }) => {
  // const [session, loading] = useSession();
  // const router = useRouter();

  // TODO this is not enough to check here and block UI, but it's a start I guess!
  // once someone's trial ends, since it is just based on the DB row creation date, just removing
  // their row would reset that state and allow for another trial period.
  // const isInactive = !loading && !session.status.active; // && !loading && !session?.active;
  // const showPaywall = isInactive && router.route !== "/subscribe";

  // if (showPaywall) return <TrialEndPaywall />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header fixed={false} />
      <div className="container mx-auto flex-grow flex p-2">
        {!hideNav && <Nav />}
        <main
          className={`px-2 ${hideNav ? "mx-auto" : ""}`}
          style={{
            width: "min(75ch, 100%)",
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
