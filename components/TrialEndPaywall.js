const { default: Link } = require("next/link");

const TrialEndPaywall = () => (
  <div>
    <h1>Oh noes!</h1>
    <h2>It looks like your trial period has ended.</h2>
    <p>
      Thank you for trying it out tho! Click{" "}
      <Link href="/subscribe">
        <a className="underline">here</a>
      </Link>{" "}
      to select and pay for a plan.
    </p>
  </div>
);
export default TrialEndPaywall;
