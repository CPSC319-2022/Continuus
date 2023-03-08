import { signIn, useSession } from "next-auth/react";

export const SignInButton: React.FC = () => {
    const { status } = useSession();

    return (
        <button
            onClick={() => signIn()}
            hidden={status === "authenticated"}
        >
            Sign-In
        </button>
    );
};

