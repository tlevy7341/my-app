import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  passwordResetFormSchema,
  passwordResetFormSchemaType,
} from "../schemas/AuthSchemas";
import { userStore } from "../zustand/userStore";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { resetPassword } = userStore();
  const [authToken, setAuthToken] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordResetFormSchemaType>({
    resolver: zodResolver(passwordResetFormSchema),
  });

  const handleResetPassword = async (data: passwordResetFormSchemaType) => {
    const response = await resetPassword(authToken, data.password);
    if (response?.error) {
      toast.error(response.error);
      return;
    }
    toast.success("Password successfully reset");
    reset();
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) navigate("/forgot-password", { replace: true });

    setAuthToken(token as string);
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 ">
      <div className="px-4 py-10 bg-white rounded shadow-lg sm:max-w-xl sm:mx-auto sm:p-20">
        <div>
          <h1 className="text-2xl font-semibold text-center text-black">
            Reset Password
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="pt-8 space-y-4 text-base text-gray-700 sm:text-lg ">
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="New Password"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                New Password
              </label>
              {errors.password && (
                <p className="mt-0 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("passwordconfirm")}
                id="passwordconfirm"
                name="passwordconfirm"
                type="password"
                className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="passwordconfirm"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
              {errors.passwordconfirm && (
                <p className="mt-0 text-sm text-red-500">
                  {errors.passwordconfirm.message}
                </p>
              )}
            </div>
            <button className="w-full text-white bg-blue-500 border-blue-500 btn hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
