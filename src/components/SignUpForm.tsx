import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image';
import btn_google from '../../public/btn_google.png'
import { api } from "~/utils/api";
import { Spinner } from "./Spinner";
import { useEffect } from "react";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const signupMutation = api.user.signup.useMutation();

  if (signupMutation.isLoading) {
    return (
      <div className="w-full flex justify-center py-8">
        <Spinner size={4} />
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <button
          onClick={() => void signIn("google", {
            callbackUrl: router.query["redirect"] as string || "/"
          })}
          className="relative flex items-center justify-center border border-solid border-gray-400 rounded-md p-2 mx-auto hover:bg-gray-100 transition-colors"
        >
          <Image
            src={btn_google}
            alt="Sign-Up With Google"
            className="mr-2"
          />
          <span>Sign-up with Google</span>
        </button>
      </div>
      <hr />
      <form className="p-4 flex flex-col" onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          "email": { value: string };
          "name": { value: string };
          "password": { value: string };
        };

        signupMutation.mutate(
          {
            email: target.email.value,
            name: target.name.value,
            password: target.password.value,
          },
          {
            onSuccess(_, vars) {
              void signIn("credentials", {
                email: vars.email,
                password: vars.password,
                callbackUrl: router.query["redirect"] as string || "/",
              })
            }
          }
        )
      }}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="name"
          type="text"
          placeholder="Name"
          minLength={2} maxLength={32}
          required
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          type="password"
          placeholder="Password"
          minLength={4} maxLength={12}
          required
        />
        {
          // TECHNICAL DEBT:: Sorry, rushed this, had no time to deal with error shapes of tRPC and Zod clashing
          /* eslint-disable */
          signupMutation.isError && (JSON.parse(signupMutation.error.shape?.message || "null") as any[]).map((err: any, i) => (
            <span key={i} className="w-full max-w-md text-red-600 font-bold text-center mb-4">
              {err.message}
            </span>
          ))
          /* eslint-enable */
        }
        <button
          className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}