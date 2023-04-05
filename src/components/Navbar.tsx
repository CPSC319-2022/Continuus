import { SearchIcon } from "~/icons/Search";
import { ContributorRequestWidget } from "./contributor-request-widget/ContributorRequestWidget";
import { RequestAccessButton } from "./contributor-request-widget/RequestAccessButton";
import { ProfileMenu } from "./ProfileMenu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Spinner } from "./Spinner";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";

export const Navbar: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div className="flex h-full justify-between border-b border-b-gray-200 p-6">
      <Link href="/" className="self-center text-xl font-bold">
        Continuous
      </Link>
      <div className="flex items-center gap-6">
        <RequestAccessButton />
        <ContributorRequestWidget />
        <div className="transition-all hover:fill-highlight-green">
          <SearchIcon />
        </div>
        {status === "loading" ? (
          <Spinner size={2} />
        ) : status === "authenticated" ? (
          <ProfileMenu />
        ) : (
          <Link href={`/auth/signinup?redirect=${router.asPath}`}>
            <button className="h-8 w-8 rounded-full">
              <FiLogIn className="scale-125 transition-all hover:stroke-highlight-green" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
