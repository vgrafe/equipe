import AppLayout from "components/AppLayout";
import Head from "components/Head";

const Privacy = () => (
  <>
    <Head title="Privacy policy" />
    <div className="space-y-3 leading-relaxed">
      <h1 className="text-2xl">Privacy policy</h1>
      <p>
        Teamwise does save the information needed to read GitHub activity on
        your behalf through an OAuth access token, and uses an encrypted cookie
        to convey this information with the browser. This includes the email
        address used for acess to GitHub and the resulting access token, which
        is suscseptible to be invalidated and refreshed.
      </p>
      <p>
        None of the data queried from GitHub is stored or persisted on our
        servers; we only store your email, settings and preferences in a
        securely hosted database.
      </p>
      <p>
        We take your privacy (and ours) seriously and do not use any kind of
        tracking pixels or marketing tags. No analytics library is being used
        for now, but if this changes we will pick one that aligns with our
        values.
      </p>
      <p>
        We do not discose any information, identifiable or not, to any third
        parties.
      </p>
      <p>
        Please check this page as our policy might see minor changes with time.
        There will be an annoucement on the home page if any major change to it
        is planeed to be implemented.
      </p>
      <p>
        Teamwise is GDPR compliant: cookies are created and used for the only
        purpose of authentication.
      </p>
    </div>
  </>
);

Privacy.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default Privacy;
