import Link from "next/link";

const Footer = () => (
  <footer className="bg-white pb-2">
    <div className="container mx-auto px-8">
      <div className="w-full flex md:flex-row pt-6">
        <div className="flex-1 mb-6 text-blue-600 no-underline hover:no-underline font-bold text-xl lg:text-2xl">
          equipe
        </div>
        <div className="space-x-4">
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
          {/* <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              "
            >
              Help
            </a>
          </li>
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              "
            >
              Support
            </a>
          </li> */}
        </div>
        {/* <div className="flex-1">
        <p className="uppercase text-gray-500 md:mb-6">Social</p>
        <ul className="list-reset mb-6">
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              "
            >
              Facebook
            </a>
          </li>
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              "
            >
              Linkedin
            </a>
          </li>
          <li className="mt-2 inline-block mr-2 md:block md:mr-0">
            <a
              href="#"
              "
            >
              Twitter
            </a>
          </li>
        </ul>
      </div> */}
      </div>
      <div className="text-gray-800 mb-4 text-xs flex space-x-4 justify-center">
        <p>
          Copyright © {new Date().getFullYear()}{" "}
          <a href="mailto:equipe@teamwise.app">Teamwise LLC</a>.
        </p>
        <Link href="/terms">
          <a>Terms of Service</a>
        </Link>
        <Link href="/privacy">
          <a>Privacy Policy</a>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
