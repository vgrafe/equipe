import Link from "next/link";
import { useRouter } from "next/router";

function PicAndName({ pic, login }) {
  const router = useRouter();

  return (
    <Link
      href="/orgs/[org]/member/[login]"
      as={`/orgs/${router.query.org}/member/${login}`}
    >
      <a>
        <div className="flex items-center space-x-2">
          {pic && (
            <img src={pic} className="h-6 w-6 rounded-full inline-block" />
          )}
          <span>{login}</span>
        </div>
      </a>
    </Link>
  );
}

export default PicAndName;
