import AppLayout from "components/AppLayout";
import Head from "components/Head";

const Faq = () => (
  <div className="space-y-4">
    <Head title="Frequently Asked Questions" />
    <h1 className="text-3xl">FAQ</h1>
    <h2 className="text-2xl">How does this work?</h2>
    <p>
      Equipe reads your organization activity and arranges it differently
      before displaying it. In order to work, its only requires you to belong to{" "}
      <strong>at least one organization</strong> on GitHub.
    </p>
    <h2 className="text-2xl">Is my data secure?</h2>
    <p>
      Yes. Equipe works by requesting OAuth access with read-only rights. None
      of the data queried is kept anywhere. We do not keep any personal data
      other than your email address to keep you logged in. We use secured +
      encrypted cookies, and don't use any pixel or trackers. We use{" "}
      <a href="https://plausible.io" target="_blank">
        plausible.io
      </a>{" "}
      for analytics.
    </p>
    <h2 className="text-2xl">Do you have a roadmap?</h2>
    <p>
      I want to keep going in the same direction: offer a solution that
      leverages and enhances GitHub's UX, without lock-in or having to adopt a
      new app. I think there's so much we can still do. Here's what I have in
      mind:
      <ul className="ml-10">
        <li className="list-disc">
          Allow to customize labels to add meaning to your activity (points,
          priorities)
        </li>
        <li className="list-disc">Add support for Gitlab</li>
        <li className="list-disc">
          Look into most requested Github features for ideas look into most
          requested Github features for ideas
        </li>
        <li className="list-disc">
          Experiment with easier ways to filter and group issues and PRs.
        </li>
      </ul>
    </p>
  </div>
);

Faq.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default Faq;
