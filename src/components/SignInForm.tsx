import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image';
import btn_google from '../../public/btn_google.png'

export const SignInForm: React.FC = () => {
  const router = useRouter();

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
            alt="Sign-In With Google"
            className="mr-2"
          />
          <span>Sign-in with Google</span>
        </button>
      </div>
      <hr />
      <form className="p-4 flex flex-col" onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          "email": { value: string };
          "password": { value: string };
        };

        void signIn("credentials", {
          email: target.email.value,
          password: target.password.value,
          callbackUrl: router.query["redirect"] as string || "/",
        })
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
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {
          router.query["error"] && (
            <span className="w-full max-w-md text-red-600 font-bold text-center mb-4">
              {router.query["error"]}
            </span>
          )
        }
        <button
          className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
}