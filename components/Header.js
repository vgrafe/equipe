import Logo from "svg/002.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useNotifications } from "utils/fetchers";

const Header = ({ fixed = true }) => {
  const [isOnTop, setIsOnTop] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    const checkScroll = () => setIsOnTop(window.scrollY === 0);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const { data: notifications } = useNotifications(!!session);

  const router = useRouter();

  const isLandingPage = router.pathname === "/";

  const isOpaque = !isOnTop || !fixed;

  return (
    <nav
      className={
        "w-full z-50 top-0 text-white duration-75 " +
        (isOpaque ? "bg-gray-100" : "") +
        (fixed ? " fixed" : " ")
      }
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div
          className={
            "pl-4 flex items-center " +
            (isOpaque ? "text-blue-600" : "text-white")
          }
        >
          <Logo className="h-10 w-10 fill-current mr-2" />
          <Link href={session ? "/orgs" : "/"}>
            <a className="no-underline hover:no-underline font-bold text-2xl lg:text-3xl hover:text-current">
              equipe
            </a>
          </Link>
        </div>

        <div
          className="flex-grow flex items-center w-auto mt-0 bg-transparent text-black p-0 z-20"
          id="nav-content"
        >
          <div className="flex-grow" />
          {!loading && session && (
            <>
              <ul className="list-reset flex justify-end flex-1 items-center">
                {notifications?.length > 0 && (
                  <li className="mr-3 font-semibold text-blue-500">
                    <a
                      href="https://github.com/notifications?query=is%3Aunread"
                      target="_blank"
                    >
                      {notifications.length} new notifications
                    </a>
                  </li>
                )}
                <li className="mr-3">
                  <Link href="/account">
                    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4">
                      Account
                    </a>
                  </Link>
                </li>
              </ul>
            </>
          )}
          {(isLandingPage || (!loading && !session)) && (
            <button
              onClick={() => {
                if (session) router.push("/orgs");
                else
                  signIn("github", {
                    callbackUrl: `${window.location.origin}/orgs`,
                  });
              }}
              className="mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-0 py-4 px-8 shadow opacity-75 hover:opacity-100 duration-75"
            >
              Try now
            </button>
          )}
        </div>
      </div>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Header;
