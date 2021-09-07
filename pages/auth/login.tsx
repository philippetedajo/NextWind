import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../context";
import AuthTemplate from "../../templates/auth.template";
import { LoginForm } from "../../_types/auth_types";
import { loginSchema } from "../../utils/schema";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { login, user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user && user?.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [user?.isLoggedIn]);

  const onLogin = async ({ email, password_min }) => {
    await login({
      email: email,
      password: password_min,
    });
  };

  return (
    <div className="w-96 lg:w-2/5">
      <form onSubmit={handleSubmit(onLogin)}>
        <h1 className="mb-10 mt-8">Login</h1>
        <h2>Login to your account</h2>
        <p className="mt-2 mb-5 text-gray-400 ">Happy to meet you again</p>

        <div className="flex flex-col mb-3">
          <label>Email *</label>
          <input
            className="input-form my-2"
            type="text"
            {...register("email")}
          />
          <small className="mt-1 text-red-500">{errors.email?.message}</small>
        </div>

        <div className="flex flex-col mb-3">
          <label>Password *</label>
          <input
            className="input-form my-2"
            type="password"
            {...register("password_min")}
          />
          <small className="mt-1 mb-1 text-red-500">
            {errors.password_min?.message}
          </small>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn w-full bg-blue-600 text-white mt-3 pb-3"
        >
          {isLoading ? "processing..." : "SIGN IN"}
        </button>

        <div className="flex mt-5 justify-between">
          <p className="">
            Don't have an account yet ?
            <Link href="/auth/register">
              <span className="text-blue-600 cursor-pointer"> Join</span>
            </Link>
          </p>

          <Link href="/auth/forgot-password">
            <a className="text-sm text-gray-500">Forgot your password ?</a>
          </Link>
        </div>

        <div className="pt-3 text-sm text-red-500">{user?.data?.message}</div>
      </form>
    </div>
  );
};

export default Login;

Login.Template = AuthTemplate;
