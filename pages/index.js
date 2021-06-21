import Footer from "components/Footer";
import Wave from "svg/wave.svg";
import WaveBottom from "svg/wave-bottom.svg";
import Header from "components/Header";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "components/Head";

const Landing = () => {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.replace("/orgs");
    });
  }, []);

  const login = () => {
    getSession().then((session) => {
      if (session) router.replace("/orgs");
      else signIn("github", { callbackUrl: `${window.location.origin}/orgs` });
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-300">
      <Head title="Equipe - better GitHub insights for your team" />
      <Header />
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex lg:w-1/2 flex-col w-full justify-center items-start text-center md:text-left py-8">
            {/* <p className="uppercase tracking-loose w-full">
                  Meet Equipe labs
                </p> */}
            <h1 className="my-4 text-5xl font-bold leading-tight text-gray-100">
              Take control of your team's assignments
            </h1>
            {/* <p className="leading-normal text-2xl text-gray-100">Do you with</p> */}
            <p className="leading-normal text-2xl text-gray-100">
              Use GitHub from a better perspective.
            </p>
            <p className="leading-normal text-2xl mb-8 text-gray-100">
              Equipe compiles your organizations activity in a dashboard to
              help you assess and take action.
            </p>

            {/* <button
              onClick={login}
              className="z-10 mx-auto lg:mx-0 hover:underline bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
            >
              Try now
            </button> */}
          </div>
          {/* <div className="w-full lg:w-1/2 py-6 text-center p-20 mb-8">
            <img className="w-full z-50" src="ss1.jpg" />
          </div> */}
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <Wave />
      </div>
      <section className="bg-gray-100 py-8 leading-relaxed">
        <div className="container max-w-5xl mx-auto m-8">
          {/* <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
            What you get
          </h1> 
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-gradient-to-r from-blue-600 to-teal-300 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div> */}
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6 self-center">
              <h3 className="text-3xl font-bold leading-none mb-3">
                Instantly analyze your teams activity
              </h3>
              <p>
                <strong>Do you wish GitHub provided a team view?</strong>
              </p>
              <p>
                Navigate easily between teams assignments, milestones, projects,
                displaying all the current work in a compiled in a synthetic
                view.
              </p>
              <p>
                Identify instantly when issues and pull requests are inactive,
                thanks to insights such as time since last action or time since
                last assignment.
              </p>
            </div>
            <img className="w-full sm:w-1/2 p-6 mt-6" src="ss1.jpg" />
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row mt-10">
            <img className="w-full sm:w-1/2 p-6 mt-6" src="ss0.jpg" />
            <div className="w-full sm:w-1/2 p-6 mt-6 self-center">
              <div className="align-middle">
                <h3 className="text-3xl font-bold leading-none mb-3">
                  Unlock the situation
                </h3>
                <p className="mb-8">
                  You are always one click away taking action. Open the relevant
                  issue or pull request instantly and contribute where needed,
                  directly on GitHub. No plugins are needed.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6 self-center">
              <h3 className="text-3xl font-bold leading-none mb-3">
                Customize your insights
              </h3>
              <p className="mb-8">
                Add even more meaning to your insights. Defining the effort
                required and task priority is as simpls as adding a label and
                setting its intent on Equipe.
              </p>
            </div>
            <Switches className="w-full sm:w-1/2 p-6 mt-6" />
          </div> */}
        </div>
      </section>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          {/* <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
            Also
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-gradient-to-r from-blue-600 to-teal-300 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div> */}
          {[
            {
              title: "Secure",
              content:
                "We only require read access to your account's organization, and nothing is kept on our servers.",
            },
            {
              title: "Efficient",
              content: `Equipe won't make changes on your behalf and encourages you to take action in GitHub instead.`,
            },
            {
              title: "No lock-in",
              content: `No need to change your workflow or adopt new concepts.`,
            },
          ].map((extra, i) => (
            <div
              key={i}
              className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink text-center"
            >
              <div className="p-4 bg-white rounded-t rounded-b-none overflow-hidden shadow justify-around">
                <div className="w-full font-bold text-xl px-6">
                  {extra.title}
                </div>
                <p className="text-base px-6">{extra.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 
          <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-2 pt-4 pb-12">
              <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
                Pricing
              </h1>
              <div className="w-full mb-4">
                <div className="h-1 mx-auto bg-gradient-to-r from-blue-600 to-teal-300 w-64 opacity-25 my-0 py-0 rounded-t"></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
                <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
                  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div className="p-8 text-3xl font-bold text-center border-b-4">
                      Free
                    </div>
                    <ul className="w-full text-center text-sm">
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                    </ul>
                  </div>
                  <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div className="w-full pt-6 text-3xl font-bold text-center">
                      £0 <span className="text-base">for one user</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="mx-auto lg:mx-0 hover:underline bg-gradient-to-r from-blue-600 to-teal-300 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
                  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div className="w-full p-8 text-3xl font-bold text-center">
                      Basic
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-teal-300 my-0 py-0 rounded-t"></div>
                    <ul className="w-full text-center text-base font-bold">
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                    </ul>
                  </div>
                  <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div className="w-full pt-6 text-4xl font-bold text-center">
                      £x.99 <span className="text-base">/ per user</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="mx-auto lg:mx-0 hover:underline bg-gradient-to-r from-blue-600 to-teal-300 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
                  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div className="p-8 text-3xl font-bold text-center border-b-4">
                      Pro
                    </div>
                    <ul className="w-full text-center text-sm">
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                      <li className="border-b py-4">Thing</li>
                    </ul>
                  </div>
                  <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    <div className="w-full pt-6 text-3xl font-bold text-center">
                      £x.99 <span className="text-base">/ per user</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="mx-auto lg:mx-0 hover:underline bg-gradient-to-r from-blue-600 to-teal-300 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
      <WaveBottom />
      <section className="container mx-auto text-center py-6 mb-12">
        <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-white">
          Increase your team's output now!
        </h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <h3 className="my-4 text-2xl leading-tight text-white">
          Try it now while it's free!
        </h3>

        <button
          onClick={login}
          className="mx-auto lg:mx-0 hover:underline bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          Let's go!
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
