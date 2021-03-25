import AppLayout from "components/AppLayout";
import Head from "components/Head";

const About = () => (
  <div className="space-y-4 mb-12">
    <Head title="About Teamwise" />
    <h1 className="text-3xl">About Teamwise</h1>
    <p>
      Github is an amazing platform and tool for teams and organizations. But
      I've always wanted something a bit more customized to my specific needs. I
      built a webapp to compile teams assignments, and quickly realized it could
      make a fun side project and help other teams.
    </p>
    <p>
      This tool is opinionated in how you should be using GitHub, but maybe
      there are people who will find it useful for their use.
    </p>
    <hr />
    <h2 className="text-2xl">The team</h2>
    <p>
      It's just me,{" "}
      <a href="https://vgrafe.com" target="_blank">
        <img
          src="https://avatars3.githubusercontent.com/u/3950855?v=4"
          className="h-6 w-6 rounded-full inline-block mr-1"
        />
        <span>Vincent</span>
      </a>
      , on my free time! Thank you for helping with any feedback and feature
      requests.
    </p>
    <hr />
    <h2 className="text-2xl">Where is that logo from?</h2>
    <p>
      The logo was produced by my buddy Jeremy:{" "}
      <a href="https://in3rds.com/" target="_new">
        https://in3rds.com/
      </a>
    </p>
  </div>
);

About.getLayout = (page) => <AppLayout hideNav>{page}</AppLayout>;

export default About;
