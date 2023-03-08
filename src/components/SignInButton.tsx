import { signIn, useSession } from "next-auth/react";

export const SignInButton: React.FC = () => {
    const { status } = useSession();

    return (
        <button
            onClick={() => void signIn()}
            hidden={status === "authenticated"}
        >
            Sign-In
        </button>
    );
};

