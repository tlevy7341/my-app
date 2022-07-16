import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  forgotPasswordFormSchema,
  forgotPasswordFormSchemaType,
} from "../schemas/AuthSchemas";
import { userStore } from "../zustand/userStore";

const ForgotPasswordPage = () => {
  const { sendForgotPasswordEmail } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormSchemaType>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const sendForgotPassword = async (formData: forgotPasswordFormSchemaType) => {
    setIsLoading(true);
    await sendForgotPasswordEmail(formData.email);

    reset();
    navigate("/check-email", { state: { from: location.pathname } });
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col px-4 py-5 bg-white rounded shadow-lg sm:max-w-xl sm:mx-auto gap-y-7 sm:p-10">
        <div>
          <h1 className="text-2xl font-semibold text-center text-black">
            Forgot your password?
          </h1>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Don't fret! Just type in your email and we will send you an email to
            reset your password!
          </p>
        </div>
        <form onSubmit={handleSubmit(sendForgotPassword)}>
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
          <button className="w-full mt-4 text-white bg-blue-500 border-blue-500 btn hover:bg-blue-500 hover:border-blue-500 focus:border-blue-500">
            {isLoading ? <BeatLoader color="white" /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
