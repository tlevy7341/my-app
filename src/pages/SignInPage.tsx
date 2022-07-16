import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInFormSchema, signInFormSchemaType } from "../schemas/AuthSchemas";

import { userStore } from "../zustand/userStore";

const SignInPage = () => {
  const { signInUser, persist } = userStore();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignInUser = async (formData: signInFormSchemaType) => {
    const response = await signInUser(formData.email, formData.password);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    navigate(from, { replace: true });
    reset();
  };

  const togglePersist = () => {
    userStore.setState({ persist: !persist });
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 ">
      <div className="px-4 pt-10 bg-white rounded shadow-lg sm:max-w-xl sm:mx-auto sm:p-20 sm:pb-0">
        <div>
          <h1 className="text-2xl font-semibold text-center text-black">
            Sign In
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleSignInUser)}>
          <div className="pt-8 space-y-4 text-base text-gray-700 sm:text-lg ">
            <div className="relative">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="Email address"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="mt-0 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
              {errors.password && (
                <p className="m-0 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <input
                id={"persist"}
                name={"persist"}
                type={"checkbox"}
                checked={persist}
                onChange={togglePersist}
              />
              <label className="ml-2 text-sm" htmlFor="persist">
                Trust this device
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full mt-2 text-white bg-blue-500 border-blue-500 btn hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500"
              >
                Sign In
              </button>
            </div>
            <div className="flex justify-center pt-5">
              <Link
                to={"/forgot-password"}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </form>
        <div className="flex justify-center pt-10 pb-2">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="pl-1 text-sm text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
