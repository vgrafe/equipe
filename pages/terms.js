import AppLayout from "components/AppLayout";
import Head from "components/Head";
import Link from "next/link";

const Terms = () => (
  <p>
    <Head title="Terms of use" />
    <div className="space-y-3 leading-relaxed">
      <h1 className="text-2xl">Terms and conditions of use</h1>
      <p>
        Teamwise does leverage your GitHub's organization(s) in order to show
        you its contents. For this reason, you need to:
        <ul className="list-disc ml-8">
          <li>
            have/open a GitHub account, and acept their own terms of use and
            privacy policy
          </li>
          <li>
            verify that your organization allows the level of access granted to
            Teamwise before opening an account. As stated in the{" "}
            <Link href="/privacy">
              <a>Privacy policy</a>
            </Link>
            , none of your or your organization's activities are stored on our
            servers, and the access requested by Teamwise is read-only.
          </li>
        </ul>
      </p>
      <p>
        Although we do not store any sensitive data, we will not tolerate any
        attempt to hack or reverse engineer the service or website, and such
        attempts will result in legal action from our end.
      </p>
      <p>
        The main premise of our service is that we do not require write access
        to your GitHub account, but this has to be said: Teamwise LLC can not be
        held responsible for any misuse resulting in loss or destruction of
        data.
      </p>
    </div>
  </p>
);

Terms.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default Terms;
